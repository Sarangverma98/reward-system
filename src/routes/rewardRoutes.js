const express = require('express');
const rewardController = require('../controllers/rewardController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/distribute-rewards', adminMiddleware, rewardController.distributeRewards);
router.get('/rewards', authMiddleware, rewardController.getRewards);

module.exports = router;
