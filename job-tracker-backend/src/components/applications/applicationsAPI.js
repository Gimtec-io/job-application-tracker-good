const express = require('express');
const Application = require('../../libraries/db/Application');
const Status = require('../../libraries/db/Status');

const router = express.Router();

// Create one
/*
  Body example
  {
    "company": "Google",
    "position": "Rockstar developer",
    "link": "https://www.gimtec.io/",
    "description": "Do whatever you want, and we pay",
    "createdAt": "2021-10-21T05:15:58.652Z"
  }
*/
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
/*
  Body example
  {
    "company": "Google",
    "position": "Rockstar developer",
    "link": "https://www.gimtec.io/",
    "description": "new description",
    "status": {
        "id": "12f4481b-ba0c-464e-b20d-5ff3df051019",
        "content": "onsite"
    }
  }
*/
router.patch('/:id', async (req, res) => {
  try {
    const application = await Application.getById(req.params.id);
    const statusData = req.body.status;
    let status;
    if (statusData.id) {
      status = await Status.getById(statusData.id);
    }
    if (!status) {
      status = await Status.create({ content: statusData.content });
    }
    await application.update({
      company: req.body.company,
      description: req.body.description,
      link: req.body.link,
      position: req.body.position,
      statusId: status.id,
    });
    application.addStatus(status);
    res.json(application);
  } catch (error) {
    // We rely on custom errors
    res.status(error.status || 400).json(error.message || 'Error creating application');
  }
});

module.exports = router;
