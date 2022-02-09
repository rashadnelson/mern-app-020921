// TO AVOID USING THE "TRY / CATCHES" TO HANDLE THE RETURN OF PROMISES, DOWNLOAD THE EXPRESS ASYNC HANDLER - npm i express-async-handler
const asyncHandler = require('express-async-handler');

// @desc:   Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (request, response) => {
	response.status(200).json({ message: 'Get goals' });
});

// @desc:   Create / Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (request, response) => {
	if (!request.body.text) {
		response.status(400);
		throw new Error('Please add a text field'); // Error handler native in Express
	}
	response.status(200).json({ message: 'Create / set goal' });
});

// @desc:   Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (request, response) => {
	response.status(200).json({ message: `Update goal ${request.params.id}` });
});

// @desc:   Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (request, response) => {
	response.status(200).json({ message: `Delete goal ${request.params.id}` });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
