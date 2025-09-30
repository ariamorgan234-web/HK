require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const estimatesRouter = require('./controllers/estimate');
const loginRouter = require('./controllers/login');
const errorHandler = require('./middleware/errorHandler');
const app = express();

console.log('Connecting to MongoDB...');
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/estimates', estimatesRouter);
app.use('/api/login', loginRouter);

app.get('/', (request, response) => {
  response.send('<h1>Construction Co. Backend is Running!</h1>');
});
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
