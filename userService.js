const express = require('express');
const router = express.Router();

const users = new Map();

router.post('/', (req, res) => {
  const { name, email } = req.body;
  const userId = Date.now().toString();
  const user = {
    userId,
    name,
    email,
    maxBookings: 3,
    activeBookings: 0
  };
  users.set(userId, user);
  res.status(201).json(user);
});

router.get('/:userId', (req, res) => {
  const user = users.get(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});


router.put('/:userId', (req, res) => {
  const user = users.get(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const { activeBookings } = req.body;
  user.activeBookings = activeBookings;
  users.set(user.userId, user);
  res.json(user);
});

module.exports = router;