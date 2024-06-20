const db = require('../utils/db');

exports.distributeRewards = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM queue ORDER BY joined_at ASC LIMIT 100');
        const rewards = [
            '₹100 Gift card',
            '₹50 Gift card',
            '₹25 Gift card'
        ];
        const rewardPromises = users.map((user, index) => {
            const reward = index < 3 ? rewards[index] : '1000 Coins';
            return db.query('INSERT INTO rewards (user_id, reward, reward_date) VALUES (?, ?, CURDATE())', [user.user_id, reward]);
        });
        await Promise.all(rewardPromises);
        await db.query('DELETE FROM queue WHERE user_id IN (?)', [users.map(user => user.user_id)]);
        res.json({ message: 'Rewards distributed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to distribute rewards' });
    }
};

exports.getRewards = async (req, res) => {
    const { userId } = req.user;
    try {
        const [rewards] = await db.query('SELECT * FROM rewards WHERE user_id = ?', [userId]);
        res.json(rewards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve rewards' });
    }
};
