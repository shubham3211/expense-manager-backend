const route = require('express').Router();
const user = require('../database/models/user');
const dbApi = require('../database/dbApi');
const userDbFunctions = new dbApi(user);

route.get('/', (req, res) => {
  userDbFunctions.getData()
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
})

route.get('/:_id', (req, res) => {
  userDbFunctions.getData(req.params)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))
})

route.post('/:_id', (req, res) => {
  userDbFunctions.updateOneRow(req.params, req.body)
      .then((data) => res.send(data))
      .catch((e) => console.log('error :', e))
})

route.put('/:_id', (req, res) => {
  userDbFunctions.updateOneRow({_id: req.params}, req.body)
    .then((data) => res.send(data))
    .catch((e) => console.log(e));
})
module.exports = route;