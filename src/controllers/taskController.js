const db = require('../utils/db');

exports.completeTask = async (req, res) => {
    const { userId } = req.user;
    try {
        const [result] = await db.query('INSERT INTO tasks (user_id, task_completed, task_date) VALUES (?, TRUE, CURDATE()) ON DUPLICATE KEY UPDATE task_completed = TRUE', [userId]);
        res.json({ message: 'Task completed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete task' });
    }
};

exports.referFriend = async (req, res) => {
    const { userId } = req.user;
    try {
        const [result] = await db.query('UPDATE tasks SET referral_completed = TRUE WHERE user_id = ? AND task_date = CURDATE()', [userId]);
        res.json({ message: 'Referral completed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete referral' });
    }
};
