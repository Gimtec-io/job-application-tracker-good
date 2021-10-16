const express = require('express');

const router = express.Router();

// Create one
router.post('/', (req, res) => {
  res.json('comment created');
});

module.exports = router;
