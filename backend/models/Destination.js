const mongoose = require('mongoose');
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

Destinations = mongoose.model('Destinations', destinationsSchema);
