const express = require('express');
const router = express.Router();
const multer = require('multer');
const doctorController = require('../controllers/doctorController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max for images
});

router.get('/', doctorController.getDoctors);
router.post('/', upload.single('image'), doctorController.createDoctor);
router.put('/:id', upload.single('image'), doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;