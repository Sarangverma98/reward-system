const db = require('../utils/db');

exports.joinQueue = async (req, res) => {
    const { userId } = req.user;
    try {
        const [task] = await db.query('SELECT * FROM tasks WHERE user_id = ? AND task_date = CURDATE() AND task_completed = TRUE AND referral_completed = TRUE', [userId]);
        if (task.length === 0) {
            return res.status(400).json({ error: 'Task or referral not completed' });
        }
        await db.query('INSERT INTO queue (user_id) VALUES (?) ON DUPLICATE KEY UPDATE joined_at = CURRENT_TIMESTAMP', [userId]);
        res.json({ message: 'Joined the queue' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to join the queue' });
    }
};

exports.getQueue = async (req, res) => {
    try {
        const [queue] = await db.query('SELECT * FROM queue ORDER BY joined_at ASC');
        res.json(queue);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve queue' });
    }
};
