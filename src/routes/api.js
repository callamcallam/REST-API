const express = require('express');
const router = express.Router();

let api_keys = ['Caleem1212', 'test']

let items = [
  { id: 1, name: 'Item 1' }
];

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || !api_keys.includes(apiKey)) {
    return res.status(401).json({ error: true, message: 'Unauthorised.'});
  }
  next();
};

router.use(checkApiKey)

router.get('/items', (req, res) => {
  res.json(items);
});

router.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({error: true, message: 'Cannot find item.'})
  res.json(item);
});

router.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');

  items.splice(itemIndex, 1);
  res.status(204).send();
});

module.exports = router;
