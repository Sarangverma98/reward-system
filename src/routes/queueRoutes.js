const express = require('express');
const queueController = require('../controllers/queueController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/join-queue', authMiddleware, queueController.joinQueue);
router.get('/queue', adminMiddleware, queueController.getQueue);

module.exports = router;
