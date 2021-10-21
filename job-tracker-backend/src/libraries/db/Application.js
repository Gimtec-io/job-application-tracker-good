const { v4 } = require('uuid');
const { CustomError } = require('../errors');
const { slugify } = require('../utils');
const db = require('./db');
const Status = require('./Status');

// Static methods should return an Application instance
class Application {
  // Populates `status` one-to-many relationship but not `comments`
  static async getAll() {
    const applicationsData = await db.applications.getAll();
    const applications = applicationsData.map((data) => new Application(data));
    const applicationsExended = Promise.all(applications.map(async (application) => {
      const status = await Status.getById(application.statusId);
      application.addStatus(status);
      return application;
    }));
    return applicationsExended;
  }

  static async getBySlug(slug) {
    const applicationData = await db.applications.getBySlug(slug);
    if (!applicationData) {
      throw new CustomError(`Application with slug ${slug}, not found`, 404);
    }
    const application = new Application(applicationData);
    const status = await Status.getById(application.statusId);
    application.addStatus(status);
    // TODO: add comments
    return application;
  }

  static async getById(id) {
    const applicationData = await db.applications.getById(id);
    if (!applicationData) {
      throw new CustomError(`Application with id ${id}, not found`, 404);
    }
    const application = new Application(applicationData);
    const status = await Status.getById(application.statusId);
    application.addStatus(status);
    // TODO: add comments
    return application;
  }

  // How we create the slug could be up to us or to the user.
  // We could have added an input in the form to create applications.
  static async createNewSlug(company, position, index) {
    const companySlug = slugify(company);
    const positionSlug = slugify(position);
    // index is used in case there is the same application for company and position
    const newSlug = index === undefined ? `${companySlug}-${positionSlug}` : `${companySlug}-${positionSlug}-${index}`;
    const application = await db.applications.getBySlug(newSlug);
    if (application) {
      const nextIndex = index === undefined ? 1 : index + 1;
      // We try to find a new slug
      return Application.createNewSlug(company, position, nextIndex);
    }
    return newSlug;
  }

  static async create({ company, position, link, description, createdAt }) {
    // Manual check. This can be done with a library
    if (!company || !position) {
      // Status 422: Unprocessable Entity
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
      throw new CustomError('Company and position are required', 422);
    }
    try {
      const defaultStatus = await Status.defaultStatus();
      const slug = await Application.createNewSlug(company, position);
      const newApplicationData = {
        id: v4(),
        company,
        position,
        slug,
        link,
        description,
        statusId: defaultStatus.id,
        // We could check format of createdAt
        // We are expecting an ISO String at UTC.
        createdAt,
      }
      await db.applications.create(newApplicationData);
      const newApplication = new Application(newApplicationData);
      newApplication.addStatus(defaultStatus);
      return newApplication;
    } catch (error) {
      console.error('Error creating application');
      console.error(error);
      // We suppose an error with the DB
      throw new CustomError('Sorry, application could not be created. Try again in a few moments.', 500);;
    }
  }

  constructor({ id, company, position, link, description, statusId, createdAt, slug }) {
    this.id = id;
    this.company = company;
    this.position = position;
    this.link = link;
    this.description = description;
    this.statusId = statusId;
    this.createdAt = createdAt;
    this.slug = slug;
  }

  addComments(comments) {
    this.comments = comments;
  }

  addStatus(status) {
    this.status = status;
  }

  // We don't allow to change id, slug or createdAt
  async update({ company, position, link, description, statusId }) {
    // Same check when creating plus statusId
    if (!company || !position || !statusId) {
      // Status 422: Unprocessable Entity
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
      throw new CustomError('Company, position and status are required', 422);
    }
    try {
      // update DB
      await db.applications.update(this.id, {
        company,
        position,
        link,
        description,
        statusId,
        id: this.id,
        createdAt: this.createdAt,
        slug: this.slug,
      });
      // update instance
      this.company = company;
      this.position = position;
      this.link = link;
      this.description = description;
      this.statusId = statusId;
    } catch (error) {
      console.error('Error updating application');
      console.error(error);
      // We suppose an error with the DB
      throw new CustomError('Sorry, application could not be updated. Try again in a few moments.', 500);;
    }
  }

  // used by JSON.stringify to serialize objects
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
  toJSON() {
    return {
      id: this.id,
      company: this.company,
      position: this.position,
      link: this.link,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      slug: this.slug,
    };
  }
}

module.exports = Application;
