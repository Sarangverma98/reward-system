const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/complete-task', authMiddleware, taskController.completeTask);
router.post('/refer-friend', authMiddleware, taskController.referFriend);

module.exports = router;
