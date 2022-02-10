const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User', // Refers to the name of the model
		},
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{
		timestamps: true, // Create an ad and updated ad field
	}
);

module.exports = mongoose.model('Goal', goalSchema);
