require('dotenv').config();
// Import required libraries and models
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require('path');
const Buynow = require('./model/buynow') // Fix model import
const Rent = require('./model/rent') // Fix model import
const ContactUs = require('./model/contactus') // Fix model import
const User = require('./model/user')
const Rentreview = require('./model/review')  // Add user model import
const app = express();
const Connection = require('./database/db')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(process.cwd(), 'public')));
const client = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "carlelo264@gmail.com",
    pass: "nqpvxvrordlfjvkw"
  }
});

app.post('/bookings', async (req, res) => {
  try {
    const currentDate = new Date();
    const dropDateCutoff = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Find and delete all bookings with dropDate less than current date
    const result = await Rent.deleteMany({ dropDate: { $lt: dropDateCutoff } });
    console.log(`${result.deletedCount} records deleted`);

    const car = await Rent.findOne({ userId: req.body.userId });
    if (car) {
      return res.status(401).json({ message: 'Car is not available now' });
    }
    console.log();
    const booking = new Rent(req.body);
    await booking.save();
    const email = booking.email;
    client.sendMail({
      from: "carlelo264@gmail.com",
      to: email,
      subject: "Your car booking details",
      text: `Your Car is booked. Details are ${booking.car_name} ${booking.car_model} & it is  booked for ${booking.pickupLocation} to ${booking.dropLocation} and from ${booking.pickupDate} to ${booking.dropDate} `
    });
    res.status(201).json({ message: 'Booking created successfully' });


  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/buynow', async (req, res) => {
  try {

    const buynows = new Buynow(req.body);
    await buynows.save();
    const email = buynows.email;
    client.sendMail({
      from: "carlelo264@gmail.com",
      to: email,
      subject: "Your car booking details",
      text: `Hello ${buynows.Customer_Name} Your Car is booked. Details are ${buynows.carname}  ${buynows.carmodel} & it's price is ${buynows.price} your delivery address is  ${buynows.dropaddress} `
    });
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/rentsreview', async (req, res) => {
  try {
    // const reviews = await Rentreview.find();
    // res.json(reviews);
    const rreview = new Rentreview(req.body);
    await rreview.save();
    res.status(201).json({ message: 'Review is subbmited succesfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to Give reviews' });
  }
});
app.post('/rentsreview', async (req, res) => {
  try {
    const reviews = await Rentreview.find();
    res.json(reviews);

    res.status(201).json({ message: 'Review is Fetch Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to Ftcj Review' });
  }
});


app.get('/rentsreview', async (req, res) => {
  try {
    const reviews = await Rentreview.find();
    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get reviews' });
  }
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/contacts', async (req, res) => {
  try {
    const contc = new ContactUs(req.body);
    await contc.save();
    const email = contc.email;
    client.sendMail({
      from: "carlelo264@gmail.com",
      to: email,
      subject: "Your car booking details",
      text: `Hello ${contc.names} . We got your these message "${contc.msg}" . Kindly provide us more proof or clarify your message in more detail by attaching neccasary deatils to give us more idea `
    });
    res.status(201).json({ message: 'Message is subbmited succesfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to save message' });
  }
});

//-----------------------------------------------------------------------------------------------------


app.post('/signup', async (req, res) => {
  try {
    const duplicateemail = await User.findOne({ email: req.body.email });
    if (duplicateemail) {
      return res.status(500).json({ message: 'Email id already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password with a salt of 10 rounds
    const user = new User({
      email: req.body.email,
      password: hashedPassword, // Store the hashed password in the database
      name: req.body.name,
      phoneno: req.body.phoneno,
      address: req.body.address
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create user / Email id already exists' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password); // Compare the entered password with the hashed password in the database
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
});

app.use(function (req, res, next) {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

