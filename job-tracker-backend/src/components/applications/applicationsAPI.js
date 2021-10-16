const express = require('express');

const router = express.Router();

// Create one
router.post('/', (req, res) => {
  res.json('Application created');
});

// Get all
router.get('/', (req, res) => {
  res.json('All aplications');
});

// Get one
router.get('/:id', (req, res) => {
  res.json(`Application show ${req.params.id}`);
});

// Update one
router.patch('/:id', (req, res) => {
  res.json('Application updated');
});

module.exports = router;
