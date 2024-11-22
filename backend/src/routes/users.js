import User from '../models/user.js';
import express from 'express';

const router = express.Router();
router.get('/me/:id', async (req, res) => {
	try {
		const user = await User.findOne({ uid: req.params.id });
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'something went wrong' });
	}
});
router.post('/saveUser', async (req, res) => {
	try {
		const { uid, email } = req.body;
		console.log(uid, email);
		if (!uid || !email) {
			return res.status(400).json({ message: 'UID and email are required' });
		}
		// Check if user already exists
		const existingUser = await User.findOne({ uid });
		if (existingUser) {
			return res.status(409).json({ message: 'User already exists' });
		}
		// Create a new user instance
		const newUser = new User({
			uid,
			email,
			isAdmin: false,
		});
		await newUser.save();
		res.status(201).json({ message: 'User saved successfully' });
	} catch (error) {
		console.error('Error saving user:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});
export default router;
