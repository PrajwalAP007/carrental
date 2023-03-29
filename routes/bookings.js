// const express = require('express');
// const router = express.Router();
// const Rent = require('../models/booking');

// router.post('/', async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const dropDateCutoff = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

//     // Find and delete all bookings with dropDate less than current date
//     const result = await Rent.deleteMany({ dropDate: { $lt: dropDateCutoff } });
//     console.log(`${result.deletedCount} records deleted`);

//     const car = await Rent.findOne({ userId: req.body.userId });
//     if (car) {
//       return res.status(401).json({ message: 'Car is not available now' });
//     }

//     const booking = new Rent(req.body);
//     await booking.save();

//     res.status(201).json({ message: 'Booking created successfully' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Failed to create booking' });
//   }
// });

// module.exports = router;
