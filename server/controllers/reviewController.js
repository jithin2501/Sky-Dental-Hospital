const Review = require('../models/Review');
const GlobalSettings = require('../models/GlobalSettings');

// Helper to get auto-approve setting
const getAutoApproveStatus = async () => {
  let setting = await GlobalSettings.findOne({ key: 'auto_approve_reviews' });
  if (!setting) {
    setting = new GlobalSettings({ key: 'auto_approve_reviews', value: false });
    await setting.save();
  }
  return setting.value;
};

// GET — current auto-approve status
exports.getAutoApproveStatusResponse = async (req, res) => {
  try {
    const status = await getAutoApproveStatus();
    res.status(200).json({ autoApprove: status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH — toggle auto-approve status
exports.toggleAutoApprove = async (req, res) => {
  try {
    let setting = await GlobalSettings.findOne({ key: 'auto_approve_reviews' });
    if (!setting) {
      setting = new GlobalSettings({ key: 'auto_approve_reviews', value: true });
    } else {
      setting.value = !setting.value;
    }
    await setting.save();
    res.status(200).json({ autoApprove: setting.value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST — client submits a review via QR page
exports.submitReview = async (req, res) => {
  try {
    const { name, rating, text } = req.body;
    if (!name || !rating || !text)
      return res.status(400).json({ message: 'All fields are required' });

    const autoApprove = await getAutoApproveStatus();
    const review = new Review({ 
      name, 
      rating: Number(rating), 
      text, 
      approved: autoApprove 
    });
    
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET — fetch only approved reviews (for the main website)
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET — fetch ALL reviews (for admin panel)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH — toggle approved status
exports.toggleApproval = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    review.approved = !review.approved;
    await review.save();
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE — remove a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};