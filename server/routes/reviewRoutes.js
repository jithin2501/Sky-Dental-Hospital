const express = require('express');
const router  = express.Router();
const reviewController = require('../controllers/reviewController');

// Public — client submits review
router.post('/',          reviewController.submitReview);

// Public — website fetches approved reviews
router.get('/approved',   reviewController.getApprovedReviews);

// Admin — all reviews
router.get('/',           reviewController.getAllReviews);

// Admin — approve/unapprove
router.patch('/:id/toggle', reviewController.toggleApproval);

// Admin — delete
router.delete('/:id',     reviewController.deleteReview);

module.exports = router;