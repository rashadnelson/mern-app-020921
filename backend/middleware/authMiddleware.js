// The purpose of this authMiddleware.js file is to use JWT to protect routes with produced Bearer tokens.
// The user id will be inside the Bearer token.

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const res = require('express/lib/response');

const protect = asyncHandler(async (request, response, next) => {
	let token;

	// With request.headers.authorization, we're checking for the authorization header.
	// With request.headers.authorization.startsWith("Bearer"), we're checking to make sure it's a Bearer token.  For a detailed description of what a Bearer token is, check out https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/
	if (
		request.headers.authorization &&
		request.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get token from header by assigning it to the "token" variable.  .split turns this into an array.
			token = request.headers.authorization.split(' ')[1];

			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from the token.
			// We want to be able to request the user for any route that's protected.  Also allows us to get the payload which is the id.
			// .select("-password") omits the password.
			request.user = await User.findById(decoded.id).select('-password');

			// next() calls the next piece of middleware
			next();

			// If something goes wrong, the error code is initiated.
		} catch (error) {
			console.log(error);
			// Status of 404 means not authorized.
			response.status(404);
			throw new Error('Not authorized');
		}
	}

	// If there's no token at all, not authorized.
	if (!token) {
		response.status(401);
		throw new Error('Not authorized, no token');
	}
});

module.exports = { protect };
