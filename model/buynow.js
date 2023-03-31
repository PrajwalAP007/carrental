const mongoose = require('mongoose');


const buySchema = new mongoose.Schema({
    section: String,
    carname: String,
    carmodel: String,
    email: String,
    userId: Number,
    price: Number,
    IdproofNo: Number,
    Customer_Name: String,
    phoneno: Number,
    Customer_address: String,
    dropaddress: String,
  });






const buynow = mongoose.model('BookingData', buySchema);

module.exports= buynow