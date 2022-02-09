// TO AVOID USING THE "TRY / CATCHES" TO HANDLE THE RETURN OF PROMISES, DOWNLOAD THE EXPRESS ASYNC HANDLER - npm i express-async-handler
const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel'); // This will have a bunch of Mongoose methods on it we can use to create in our database what we want to do.

// @desc:   Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (request, response) => {
	const goals = await Goal.find();
	response.status(200).json(goals);
});

// @desc:   Create / Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (request, response) => {
	if (!request.body.text) {
		response.status(400);
		throw new Error('Please add a text field'); // Error handler native in Express
	}

	const goal = await Goal.create({
		text: request.body.text,
	});

	response.status(200).json(goal);
});

// @desc:   Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (request, response) => {
	const goal = await Goal.findById(request.params.id);

	if (!goal) {
		respond.status(400);
		throw new Error('Goal not found');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(
		request.params.id,
		request.body,
		{
			new: true,
		}
	);

	response.status(200).json(updatedGoal);
});

// @desc:   Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (request, response) => {
	const goal = await Goal.findById(request.params.id);

	if (!goal) {
		respond.status(400);
		throw new Error('Goal not found');
	}

	await goal.remove();

	response.status(200).json({ id: request.params.id });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal,
};
