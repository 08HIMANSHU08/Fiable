const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transactionController');
const summaryController = require('../controllers/summaryController')

router.get('/', transactionController.test)
router.get('/transactions', AuthMiddleware.authVerificationMiddleware, transactionController.getTransactions);
router.get('/transactions/:id', AuthMiddleware.authVerificationMiddleware, transactionController.getTransactionById);
router.get('/summary', AuthMiddleware.authVerificationMiddleware, summaryController.getSummary);
router.get('/recent-transactions', AuthMiddleware.authVerificationMiddleware, transactionController.recentTransaction);

module.exports = router;
