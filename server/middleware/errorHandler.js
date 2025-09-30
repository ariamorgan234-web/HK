// backend/middleware/errorHandler.js

const errorHandler = (error, request, response, next) => {
  console.error('ERROR! ->', error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  response.status(500).json({ error: 'Something went wrong on the server' });

  next(error);
};

module.exports = errorHandler;
