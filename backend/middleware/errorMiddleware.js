const errorHandler = (error, request, response, next) => {
	const statusCode = response.statusCode ? response.statusCode : 500;
	// If the status code reflects what's already in the controller, then we'll use that.
	// Else use the status code of 500 and use place in the status code variable.

	response.status(statusCode);

	response.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack,
		// Stack trace provides additional info.  We only want this if we're in development mode.
		// If it's in production mode, then it's null.
		// Else, we'll show what's in the error stack (line numbers and stuff like that)
	});
};

module.exports = {
	errorHandler,
};
