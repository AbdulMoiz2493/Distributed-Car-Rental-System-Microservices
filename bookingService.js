const express = require('express');
const axios = require('axios');
const router = express.Router();

const bookings = new Map();

// create a booking
router.post('/', async (req, res) => {
  try {
    const { userId, carId, startDate, endDate } = req.body;

    // Check user booking limit
    const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
    const user = userResponse.data;
    if (user.activeBookings >= user.maxBookings) {
      return res.status(400).json({ error: 'Booking limit reached' });
    }

    // check car availability
    const carResponse = await axios.get(`http://localhost:3000/cars/${carId}`);
    const car = carResponse.data;
    if (!car.isAvailable) {
      return res.status(400).json({ error: 'Car not available' });
    }

    // create booking
    const bookingId = Date.now().toString();
    const booking = {
      bookingId,
      userId,
      carId,
      startDate,
      endDate,
      status: 'active'
    };
    bookings.set(bookingId, booking);

    // update car availability
    await axios.put(`http://localhost:3000/cars/${carId}`, { isAvailable: false });

    // update user's active bookings
    await axios.put(`http://localhost:3000/users/${userId}`, {
      activeBookings: user.activeBookings + 1
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// get user's bookings
router.get('/:userId', (req, res) => {
  const userBookings = Array.from(bookings.values())
    .filter(booking => booking.userId === req.params.userId);
  res.json(userBookings);
});

// cancel booking
router.delete('/:bookingId', async (req, res) => {
  try {
    const booking = bookings.get(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // update car availability
    await axios.put(`http://localhost:3000/cars/${booking.carId}`, { isAvailable: true });

    // get user details
    const userResponse = await axios.get(`http://localhost:3000/users/${booking.userId}`);
    const user = userResponse.data;

    // update user's active bookings
    await axios.put(`http://localhost:3000/users/${booking.userId}`, {
      activeBookings: user.activeBookings - 1
    });

    // update booking status
    booking.status = 'canceled';
    bookings.set(booking.bookingId, booking);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

module.exports = router;