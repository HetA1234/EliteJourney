import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	uid: String,
	email: String,
	isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);
export default User;
