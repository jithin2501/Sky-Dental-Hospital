const express = require('express');
const router  = express.Router();
const doctorProfileController = require('../controllers/doctorProfileController');

// GET all profiles
router.get('/', doctorProfileController.getAllProfiles);

// GET profile for a specific doctor
router.get('/:doctorId', doctorProfileController.getProfile);

// POST/PUT — create or update profile for a doctor (upsert)
router.post('/:doctorId',  doctorProfileController.upsertProfile);
router.put('/:doctorId',   doctorProfileController.upsertProfile);

// DELETE profile for a doctor
router.delete('/:doctorId', doctorProfileController.deleteProfile);

module.exports = router;