// const express = require('express');
// const router = express.Router();
// const Rentreview = require('../models/rentreview');

// router.post('/', async (req, res) => {
//     try {
//         const reviews = await Rentreview.find();
//         res.json(reviews);
//         const rreview = new Rentreview(req.body);
//         await rreview.save();
//         res.status(201).send(rreview);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });



// router.get('/', async (req, res) => {
//     try {
//         const reviews = await Rentreview.find();
//         res.json(reviews);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Failed to get reviews' });
//     }
// });

// module.exports = router;