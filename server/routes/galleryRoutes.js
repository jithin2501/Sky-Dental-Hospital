const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../controllers/galleryController');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max
});

router.get('/', galleryController.getGallery);
router.post('/', galleryController.createSection);
router.put('/:id', galleryController.updateSection);
router.delete('/:id', galleryController.deleteSection);
router.post('/:sectionId/items', upload.single('media'), galleryController.addItem);
router.delete('/:sectionId/items/:itemId', galleryController.deleteItem);

module.exports = router;
