const mongoose = require('mongoose');


const ConatactSchema = new mongoose.Schema({
    phoneno: Number,
    names: String,
    email: String,
    msg: String
  
  
  });
  const contact = mongoose.model('ContactData', ConatactSchema);


module.exports= contact