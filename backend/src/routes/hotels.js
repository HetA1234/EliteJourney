import Hotel from '../models/hotels.js';
import PopularDestinations from '../models/popularhotels.js';
import express from 'express';

const router = express.Router();

router.get('/hotelsResults', async (req, res) => {
	try {
		const hotelsResults = await Hotel.find();
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

router.get('/popularDestinations', async (req, res) => {
	try {
		const popularDestinations = await PopularDestinations.find();
		console.log('popularDestinations', popularDestinations);
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

export default router;
