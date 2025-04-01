const express = require('express');
const cors = require('cors');
const userService = require('./userService');
const carService = require('./carService');
const bookingService = require('./bookingService');

const app = express();
app.use(express.json());
app.use(cors());

// Mount services
app.use('/users', userService);
app.use('/cars', carService);
app.use('/bookings', bookingService);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Car Rental System running on port ${PORT}`);
});
