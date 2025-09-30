// server/create_admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
require('dotenv').config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await User.deleteMany({});

  const password = 'admin';
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const adminUser = new User({
    username: 'admin',
    passwordHash,
  });

  await adminUser.save();
  console.log('Admin user created successfully!');
  mongoose.connection.close();
};

createAdmin();
