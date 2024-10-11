const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	uid: String,
	email: String,
	displayName: String,
});
const User = mongoose.model('User', userSchema);
export default User;
