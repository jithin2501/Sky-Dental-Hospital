const express = require('express');
const router = express.Router();
const multer = require('multer');
const mediaController = require('../controllers/mediaController');

// ✅ Use memoryStorage so file.buffer is available in the controller
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max
});

router.post('/upload', upload.single('media'), mediaController.uploadMedia);
router.get('/latest', mediaController.getLatestMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;