// const express = require('express');
// const mongoose = require('mongoose');
// const rentreviewsRouter = require('./routes/rentsreview');
// const buynowRouter=require('./routes/buynow')
// const bookingRouter=require("./routes/bookings")
// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/rental', { useNewUrlParser: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('Error connecting to MongoDB', err));

// // Middleware to parse incoming JSON data
// app.use(express.json());

// // Mount the rentreviews router at /rentreviews
// app.use('/bookings', bookingRouter);
// app.use('/buynow', buynowRouter);
// app.use('/rentsreview', rentreviewsRouter);


// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));
