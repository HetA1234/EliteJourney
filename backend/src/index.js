import { Schema, connect, model } from 'mongoose';
import express, { json, urlencoded } from 'express';

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import cors from 'cors';
import hotelRoutes from './routes/hotels.js';
import myHotelRoutes from './routes/my-hotels.js';
import userRoutes from './routes/users.js';

config();

connect(process.env.MONGODB_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('MongoDB connection error:', error));

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const corsOptions = {
	origin: 'http://localhost:5173', // or your frontend URL
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/my-hotels', myHotelRoutes);

app.listen(8000, () => {
	console.log('server running on localhost:8000');
});
