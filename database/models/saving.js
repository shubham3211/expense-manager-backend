const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savingSchema = new mongoose.Schema({
  date         :Date,
  goalAmount   :Number,
  savingAmount :Number,
  savingFor    :String,
  comment      :String,
  goalAchieved :Boolean,
  user         :{type:Schema.Types.ObjectId, ref:'user'}
})

const saving = mongoose.model('saving', savingSchema);
module.exports = saving;