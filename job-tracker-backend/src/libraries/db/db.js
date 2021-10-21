const data = require('./data.json');

const applications = {
  async getAll() {
    return data.applications;
  },

  async getBySlug(slug) {
    return data.applications.find((application) => application.slug === slug);
  },

  async create(newApplication) {
    // A normal DB would also do some checks to ensure consistency.
    data.applications.push(newApplication);
    return undefined
  }
};

const comments = {
  async getByApplicationId(applicationId) {
    return data.comments.filter((comment) => comment.applicationId === applicationId);
  }
};

const statuses = {
  async getById(id) {
    return data.statuses.find((statusData) => statusData.id === id);
  },

  async getByContent(content) {
    return data.statuses.find((statusData) => statusData.content === content);
  }
}

module.exports = {
  applications,
  comments,
  statuses
}