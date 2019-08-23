const route = require('express').Router();
const expense = require('../database/models/expense');
const dbApi = require('../database/dbApi');
const expenseDbFunctions = new dbApi(expense);
const moment = require('moment');

function expenseThisMonth(userId, timeFrame) {
  return expense.find({
    date: {
      $gte: moment().startOf(timeFrame).toDate(),
      $lte: moment().startOf(timeFrame).endOf(timeFrame).toDate()
    },
    user: userId
  })
}

route.get('/' , (req, res) => {
  expenseDbFunctions.getData()
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
});

route.post('/', (req, res) => {
  req.body.date = moment(moment(req.body.date).format('DD-MM-YYYY'), 'DD-MM-YYYY').toDate();
  expenseDbFunctions.addCollections(req.body)
    .then((data) => res.send(data))
    .catch((e) => console.log(e))
})

route.get('/duration/:timePeriod' , (req, res) => {
  console.log(req.user);
  if(!['week', 'month', 'year'].includes(req.params.timePeriod)){
    res.status(422).send('Check the params');
  }else{
    expenseThisMonth(req.user._id, req.params.timePeriod)
    .then((data) => {
      console.log(data);
      res.send(data)
    })
    .catch((err) => res.send(new Error(err)))
  }
})

route.post('/:_id', (req, res) => {
  expenseDbFunctions.updateOneRow(req.params, req.body)
    .then((data) => res.send(data))
    .catch((e) => console.log(e))
})

route.get('/user/:_id', (req, res)=> {
  expenseDbFunctions.getData({user: req.params._id})
    .then(data => res.send(data))
    .catch((e) => console.log(e))
})

route.put('/:_id', (req, res) => {
  console.log(req.params)
  expenseDbFunctions.updateOneRow({_id: req.params}, req.body)
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
})

route.delete('/:_id', (req, res) => {
  expense.findByIdAndDelete(req.params._id)
    .then((data) => res.send(data))
    .catch((data) => res.send(data))
})

module.exports = route;
