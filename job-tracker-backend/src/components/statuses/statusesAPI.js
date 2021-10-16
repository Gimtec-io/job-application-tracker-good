const express = require('express');

const router = express.Router();

// Get all
router.get('/', (req, res) => {
  res.json('all statuses');
});

module.exports = router;
