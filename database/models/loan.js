const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  date     :Date,
  amount   :Number,
  loanType :String,
  reason   :String,
  status   :Boolean,
  user     :{type:Schema.Types.ObjectId, ref:'user'}
})

const loan = mongoose.model('loan', loanSchema);
module.exports = loan;