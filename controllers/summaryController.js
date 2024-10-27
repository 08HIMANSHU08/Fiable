const Transaction = require('../models/Transaction');
const logger = require('../utils/logger');

const getSummary = async (req, res) => {
  try {
    const totalVolume = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      },
    ]);

    const averageAmount = await Transaction.aggregate([
      { 
        $group: {
          _id: null,
          averageAmount: { 
            $avg: '$amount' 
          } 
        } 
      },
    ]);

    const dailyTotals = await Transaction.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    const monthlyTotals = await Transaction.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    const statusBreakdown = await Transaction.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);
    logger.info('Fetching transaction summary:');
    res.status(200).json({
      totalVolume: totalVolume[0]?.totalAmount || 0,
      averageAmount: averageAmount[0]?.averageAmount || 0,
      dailyTotals,
      monthlyTotals,
      statusBreakdown,
    });
  } catch (error) {
    logger.error('Error fetching transaction summary:', error);
    res.status(500).json({ message: 'Error fetching summary data' });
  }
};

module.exports = {
  getSummary,
};
