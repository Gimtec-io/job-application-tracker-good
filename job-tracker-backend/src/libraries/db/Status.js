const db = require('./db');

// Static methods should return an Application instance
class Status {
  static async getAll() {
    const statusesData = await db.statuses.getAll();
    return statusesData.map((statusData) => new Status(statusData));
  }

  static async getById(id) {
    const statusData = await db.statuses.getById(id);
    return new Status(statusData);
  }

  static async defaultStatus() {
    return db.statuses.getByContent('waiting first response');
  }

  constructor({ id, content }) {
    this.id = id;
    this.content = content;
  }

  // used by JSON.stringify to serialize objects
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
  toJSON() {
    return {
      id: this.id,
      content: this.content,
    };
  }
}

module.exports = Status;
