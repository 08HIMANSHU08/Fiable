const Transaction = require('../models/Transaction');
const logger = require('../utils/logger'); 
const { wss } = require('../app'); 

const test = async(req,res)=>{
  try{
    res.send("Hello world")
  } catch(err){
    logger.error(err);
  }
}
const getTransactions = async (req, res) => {
  const { page = 2, limit = 10, type, status, startDate, endDate } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (startDate && endDate) filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  try {
    const transactions = await Transaction.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
      logger.info(`Get All Transactions: Page: ${page} Limit:${limit}`);
    res.json(transactions);
  } catch (error) {
    logger.error(`Error fetching transactions: ${error.message}`);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    logger.info(`Fetched transactions: id ${req.params.id}`);
    res.json(transaction);
  } catch (error) {
    logger.error(`Error fetching transaction by ID: ${error.message}`);
    res.status(500).json({ error: 'Error fetching transaction details' });
  }
};

const recentTransaction = async (req, res) => {
  const limit = 10;
  try {
      const recentTransactions = await Transaction.find({})
          .sort({ date: -1 })
          .limit(limit);
      logger.info(`Fetched recent transactions`);
      res.status(200).json(recentTransactions);
      broadcastRecentTransactions(recentTransactions);
  } catch (error) {
      logger.error(`Error fetching recent transaction: ${error.message}`);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const broadcastRecentTransactions = (recentTransactions) => {
  try{
    logger.info(`${wss} hello`)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        logger.info("this is done", recentTransaction)
          client.send(JSON.stringify(recentTransactions));
      }
  });
  } catch(error){
    logger.error(`WebScoket Failed: ${error.message}`);
  }
 
};

module.exports = {
  getTransactions,
  getTransactionById,
  recentTransaction,
  test
};

