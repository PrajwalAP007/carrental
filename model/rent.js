const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    section: String,
    email: String,
    userId: Number,
    IdproofNo: Number,
    pickupLocation: String,
    dropLocation: String,
    pickupDate: Date,
    dropDate: Date,
    driverAge: Number,
    totalRate: Number,
    car_name:String,
    car_model:String
  });
  
  // Create a new model based on the schema
  const bookings = mongoose.model('Rentdata', bookingSchema);

  module.exports= bookings