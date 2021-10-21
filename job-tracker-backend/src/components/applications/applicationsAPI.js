const express = require('express');
const Application = require('../../libraries/db/Application');

const router = express.Router();

// Create one
router.post('/', async (req, res) => {
  try {
    const newApplication = await Application.create(req.body);
    res.json(newApplication);
  } catch (error) {
    // We rely on custom errors
    res.status(error.status || 400).json(error.message || 'Error creating application');
  }
});

// Get all
router.get('/', async (req, res) => {
  try {
    const applications = await Application.getAll();
    res.json(applications);
  } catch (error) {
    // We rely on custom errors
    res.status(error.status || 500).json(error.message || 'Error getting applications');
  }
});

// Get one
router.get('/:slug', async (req, res) => {
  try {
    const application = await Application.getBySlug(req.params.slug);
    res.json(application);
  } catch (error) {
    // We rely on custom errors
    res.status(error.status || 500).json(error.message || `Error getting application ${req.params.slug}`);
  }
});

// Update one
router.patch('/:id', async (req, res) => {
  try {
    // PENDING to create new status
    const application = await Application.getById(req.params.id);
    await application.update(req.body);
    res.json(application);
  } catch (error) {
    // We rely on custom errors
    res.status(error.status || 400).json(error.message || 'Error creating application');
  }
});

module.exports = router;
