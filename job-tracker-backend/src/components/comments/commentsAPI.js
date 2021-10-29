const express = require('express');
const Comment = require('./Comment');

const router = express.Router();

// Create one
/*
  Body example
  {
    "content": "That was easy!",
    "applicationId": "3b0a2782-9c2d-488f-9579-1b1fc41d9a2e"
  }
*/
router.post('/', async (req, res) => {
  try {
    // we could change that `applicationId` exists
    const newComment = await Comment.create(req.body);
    res.json(newComment);
  } catch (error) {
    // We rely on custom errors
    res.status(error.status || 400).json(error.message || 'Error creating application');
  }
});

module.exports = router;
