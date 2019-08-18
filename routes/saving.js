const route = require('express').Router();
const saving = require('../database/models/saving');
const dbApi = require('../database/dbApi');
const savingDbFunctions = new dbApi(saving);

route.get('/', (req, res) => {
  savingDbFunctions.getData()
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
})

route.post('/', (req, res) => {
  savingDbFunctions.addCollections(req.body)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))    
})

route.get('/:_id', (req, res) => {
  savingDbFunctions.getData(req.params)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))
})

route.post('/:_id', (req, res) => {
  savingDbFunctions.updateOneRow(req.params, req.body)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))
})

route.get('/user/:_id', (req, res)=> {
  savingDbFunctions.getData({user: req.params._id})
    .then(data => res.send(data))
    .catch((e) => console.log(e))
})

route.put('/:_id', (req, res) => {
  savingDbFunctions.updateOneRow({_id: req.params}, req.body)
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
})
module.exports = route;