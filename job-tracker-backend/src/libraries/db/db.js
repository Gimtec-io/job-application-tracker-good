const data = require('./data.json');

const applications = {
  async getAll() {
    return Object.values(data.applications);
  },

  async getBySlug(slug) {
    return Object.values(data.applications).find((application) => application.slug === slug);
  },

  async create(newApplication) {
    // A normal DB would also do some checks to ensure consistency.
    data.applications[newApplication.id] = newApplication;
    return undefined
  }
};

const comments = {
  async getByApplicationId(applicationId) {
    return Object.values(data.comments).filter((comment) => comment.applicationId === applicationId);
  }
};

const statuses = {
  async getAll() {
    return Object.values(data.statuses);
  },

  async getById(id) {
    return data.statuses[id];
  },

  async getByContent(content) {
    return Object.values(data.statuses).find((statusData) => statusData.content === content);
  }
}

module.exports = {
  applications,
  comments,
  statuses
}