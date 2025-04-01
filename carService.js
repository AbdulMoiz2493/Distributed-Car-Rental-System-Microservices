const express = require('express');
const router = express.Router();

const cars = new Map();


router.post('/', (req, res) => {
  const { model, location } = req.body;
  const carId = Date.now().toString();
  const car = {
    carId,
    model,
    location,
    isAvailable: true
  };
  cars.set(carId, car);
  res.status(201).json(car);
});

router.get('/:carId', (req, res) => {
  const car = cars.get(req.params.carId);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});


router.put('/:carId', (req, res) => {
  const car = cars.get(req.params.carId);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  
  const { isAvailable } = req.body;
  car.isAvailable = isAvailable;
  cars.set(car.carId, car);
  res.json(car);
});

module.exports = router;