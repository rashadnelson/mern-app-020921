const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
		// There's an object called "connection" and within it, there's a property called "host"
		// .cyan.underline is from the "colors" package.  Provide color and text underline for the console.log message.
	} catch (error) {
		console.log(error);
		process.exit(1); // Allows you to exit the process with a failure code of 1.
	}
};

module.exports = connectDB;
