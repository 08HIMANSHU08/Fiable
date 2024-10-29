const express = require('express');
const rateLimiter = require('./middleware/rateLimiter');
const transactionRoutes = require('./routes/transactionRoutes');
const logger = require('./utils/logger')
const connectDB = require('./config/db');
const cors = require('cors')
require('dotenv').config();
const WebSocket  =  require('ws')
const http = require('http')
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
app.use(express.json());

app.use(rateLimiter);
app.use('/', transactionRoutes);

wss.on('connection', (ws) => {
    logger.info('New client connected');

    ws.on('close', () => {
        logger.info('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;

connectDB();

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, wss };
