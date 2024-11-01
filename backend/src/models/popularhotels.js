import mongoose from 'mongoose';
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

const PopularDestinations = mongoose.model('PopularDestinations', destinationsSchema);
export default PopularDestinations;
