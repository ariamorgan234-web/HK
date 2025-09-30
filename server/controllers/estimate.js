// backend/controllers/estimates.js
const { tokenExtractor, userExtractor } = require('../utils/middleware');
const estimatesRouter = require('express').Router();
const Estimate = require('../models/estimate');
const { sendNewEstimateNotification } = require('../utils/mailer');
estimatesRouter.get(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const estimates = await Estimate.find({});
    response.json(estimates);
  }
);

estimatesRouter.post('/', async (request, response) => {
  const body = request.body;

  const estimate = new Estimate({
    name: body.name,
    phone: body.phone,
    email: body.email,
    message: body.message,
    date: new Date(),
  });

  const savedEstimate = await estimate.save();

  try {
    await sendNewEstimateNotification(savedEstimate);
  } catch (emailError) {
    console.error(
      'Failed to send email, but estimate was saved.',
      emailError.message
    );
  }

  response.status(201).json(savedEstimate);
});

module.exports = estimatesRouter;
