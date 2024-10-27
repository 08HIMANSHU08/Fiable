const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    status: { type: String, enum: ['successful', 'pending'], required: true },
    date: { type: Date, default: Date.now }
});

transactionSchema.index({ date: 1, type: 1, status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
