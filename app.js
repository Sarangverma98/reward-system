const express = require('express');
const dotenv = require('dotenv');
const cron = require('node-cron');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const queueRoutes = require('./src/routes/queueRoutes');
const rewardRoutes = require('./src/routes/rewardRoutes');
const rewardController = require('./src/controllers/rewardController');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', queueRoutes);
app.use('/api', rewardRoutes);

cron.schedule('0 0 * * *', async () => {
    try {
        await rewardController.distributeRewards({ user: { username: 'admin1' } }, { json: () => {}, status: () => ({ json: () => {} }) });
        console.log('Rewards distributed successfully');
    } catch (error) {
        console.error('Failed to distribute rewards:', error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
