const route = require('express').Router();
const loan = require('../database/models/loan');
const dbApi = require('../database/dbApi');
const loanDbFunctions = new dbApi(loan);

route.get('/', (req, res) => {
  loanDbFunctions.getData()
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
})

route.post('/', (req, res) => {
  loanDbFunctions.addCollections(req.body)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))    
})

route.get('/:_id', (req, res) => {
  loanDbFunctions.getData(req.params)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))
})

route.post('/:_id', (req, res) => {
  loanDbFunctions.updateOneRow(req.params, req.body)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))
})

route.get('/user/:_id', (req, res)=> {
  loanDbFunctions.getData({user: req.params._id})
    .then(data => res.send(data))
    .catch((e) => console.log(e))
})

route.put('/:_id', (req, res) => {
  loanDbFunctions.updateOneRow({_id: req.params}, req.body)
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
})
module.exports = route;