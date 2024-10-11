const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// const Destinations = require('../models/Destination');

// const User = require('../models/User');
mongoose.connect(process.env.MONGODB_URI);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: '*', // Frontend URL
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // HTTP methods to allow
	credentials: true, // Allow credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));
const destinationsSchema = new mongoose.Schema({
	code: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
});
const userSchema = new mongoose.Schema({
	uid: String,
	email: String,
	displayName: String,
});
const bookingSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	adultCount: { type: Number, required: true },
	childCount: { type: Number, required: true },
	checkIn: { type: Date, required: true },
	checkOut: { type: Date, required: true },
	userId: { type: String, required: true },
	totalCost: { type: Number, required: true },
});

const hotelSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	adultCount: { type: Number, required: true },
	childCount: { type: Number, required: true },
	facilities: [{ type: String, required: true }],
	pricePerNight: { type: Number, required: true },
	starRating: { type: Number, required: true, min: 1, max: 5 },
	imageUrls: [{ type: String, required: true }],
	lastUpdated: { type: Date, required: true },
	bookings: [bookingSchema],
});
const User = mongoose.model('User', userSchema);

const Destinations = mongoose.model('Destinations', destinationsSchema);
const Hotels = mongoose.model('Hotels', hotelSchema);

app.get('/api/hotelsResults', async (req, res) => {
	try {
		const hotelsResults = await Hotels.find();
		res.status(200).json({
			data: {
				elements: hotelsResults,
			},
			errors: [],
		});
	} catch (error) {
		console.error('Error fetching popular destinations:', error);
		res.status(500).json({
			data: {
				elements: [],
			},
			errors: ['Failed to fetch popular destinations'],
		});
	}
});

app.get('/api/popularDestinations', async (req, res) => {
	try {
		const popularDestinations = await Destinations.find();
		res.status(200).json({
			data: {
				elements: popularDestinations,
			},
			errors: [],
		});
	} catch (error) {
		console.error('Error fetching popular destinations:', error);
		res.status(500).json({
			data: {
				elements: [],
			},
			errors: ['Failed to fetch popular destinations'],
		});
	}
});

// POST endpoint to save user data
app.post('/api/saveUser', async (req, res) => {
	try {
		const { uid, email, displayName } = req.body;
		console.log(email);
		// Validate incoming data
		if (!uid || !email) {
			return res.status(400).json({ message: 'UID and email are required' });
		}
		// Create a new user instance
		const newUser = new User({
			uid,
			email,
			displayName,
		});
		// Save user to the database
		await newUser.save();
		res.status(201).json({ message: 'User saved successfully' });
	} catch (error) {
		console.error('Error saving user:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});
app.listen(8000, () => {
	console.log('server running on localhost:8000');
});
