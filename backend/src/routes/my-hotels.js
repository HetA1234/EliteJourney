import Hotel from '../models/hotels.js';
import cloudinary from 'cloudinary';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
	},
});

// POST /api/my-hotels - Add a new hotel
router.post('/', upload.array('imageFiles', 6), async (req, res) => {
	try {
		const imageFiles = req.files;
		const newHotel = req.body;
		if (!newHotel.userId || !newHotel.name || !newHotel.city) {
			return res.status(400).json({ message: 'Missing required hotel information' });
		}
		// Upload images to Cloudinary
		const imageUrls = await uploadImages(imageFiles);
		newHotel.imageUrls = imageUrls;
		newHotel.lastUpdated = new Date();
		const hotel = new Hotel(newHotel);
		await hotel.save();
		res.status(201).json(hotel);
	} catch (error) {
		console.error('Error creating hotel:', error);
		res.status(500).json({ message: 'Error saving hotel. Please try again later.' });
	}
});

// GET /api/my-hotels - Fetch all hotels for a specific user
router.get('/', async (req, res) => {
	try {
		const hotels = await Hotel.find({ userId: req.userId });
		res.json(hotels);
	} catch (error) {
		console.error('Error fetching hotels:', error);
		res.status(500).json({ message: 'Error fetching hotels' });
	}
});

// GET /api/my-hotels/:id - Fetch a specific hotel by ID
router.get('/:id', async (req, res) => {
	try {
		const hotel = await Hotel.findOne({ _id: req.params.id });
		if (!hotel) {
			return res.status(404).json({ message: 'Hotel not found' });
		}
		res.json(hotel);
	} catch (error) {
		console.error('Error fetching hotel:', error);
		res.status(500).json({ message: 'Error fetching hotel' });
	}
});

// PUT /api/my-hotels/:hotelId - Update a specific hotel
router.put('/:hotelId', upload.array('imageFiles'), async (req, res) => {
	try {
		const updatedHotelData = req.body;
		updatedHotelData.lastUpdated = new Date();
		const hotel = await Hotel.findOneAndUpdate({ _id: req.params.hotelId }, updatedHotelData, { new: true });
		if (!hotel) {
			return res.status(404).json({ message: 'Hotel not found' });
		}
		const files = req.files;
		if (files && files.length > 0) {
			const updatedImageUrls = await uploadImages(files);
			hotel.imageUrls = [...updatedImageUrls, ...(updatedHotelData.imageUrls || [])];
		}
		await hotel.save();
		res.status(200).json(hotel);
	} catch (error) {
		console.error('Error updating hotel:', error);
		res.status(500).json({ message: 'Error updating hotel' });
	}
});

// DELETE /api/my-hotels/:hotelId - Delete a specific hotel
router.delete('/delete/:hotelId', async (req, res) => {
	try {
		const hotel = await Hotel.findOneAndDelete({ _id: req.params.hotelId });
		if (!hotel) {
			return res.status(404).json({ message: 'Hotel not found' });
		}
		res.status(201).json(hotel);
	} catch (error) {
		console.error('Error deleting hotel:', error);
		res.status(500).json({ message: 'Error Deleting hotel' });
	}
});
// Helper function to upload images to Cloudinary
async function uploadImages(imageFiles) {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString('base64');
		const dataURI = `data:${image.mimetype};base64,${b64}`;
		const result = await cloudinary.uploader.upload(dataURI);
		return result.url;
	});
	return Promise.all(uploadPromises);
}

export default router;
