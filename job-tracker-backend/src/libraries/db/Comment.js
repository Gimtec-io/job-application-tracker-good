const { v4 } = require('uuid');
const db = require('./db');

// Static methods should return a Comment instance
class Comment {
  static async getByApplicationId(applicationId) {
    const commentsData = await db.comments.getByApplicationId(applicationId);
    return commentsData.map((commentData) => new Comment(commentData));
  }

  static async create({ content, applicationId }) {
    
  }

  constructor({ id, content, applicationId, createdAt }) {
    this.id = id;
    this.content = content;
    this.applicationId = applicationId;
    this.createdAt = createdAt;
  }

  // used by JSON.stringify to serialize objects
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
  toJSON() {
    return {
      id: this.id,
      content: this.content,
      createdAt: this.createdAt,
      applicationId: this.applicationId,
    };
  }
}

module.exports = Comment;
