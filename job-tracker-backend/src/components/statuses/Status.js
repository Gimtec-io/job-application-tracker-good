const { v4 } = require('uuid');
const db = require('../../libraries/db');

// Static methods should return a Status instance
class Status {
  static async getAll() {
    const statusesData = await db.statuses.getAll();
    return statusesData.map((statusData) => new Status(statusData));
  }

  static async getById(id) {
    const statusData = await db.statuses.getById(id);
    if (statusData) {
      return new Status(statusData);
    }
    return undefined;
  }

  static async defaultStatus() {
    return db.statuses.getByContent('waiting first response');
  }

  static async create({ content }) {
    const newStatus = {
      id: v4(),
      content,
    };
    await db.statuses.create(newStatus);
    return newStatus;
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
