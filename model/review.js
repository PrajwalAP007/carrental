
const mongoose = require('mongoose');

const rentreviewSchema = new mongoose.Schema({
    section: String,
    rating: String,
    name: String,
    email:String,
    review: String,
    subsection: String,
  
  
  });
  const review = mongoose.model('RentreviewData', rentreviewSchema);
  module.exports = review