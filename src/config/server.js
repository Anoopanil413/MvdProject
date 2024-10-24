import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './database.js';
import userRoutes from '../routes/userRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';

const startServer = async () => {
  const app = express();
  app.use(bodyParser.json());

  // Connect to MongoDB
  await connectDB();

  // Setup routes
  app.use('/api/users', userRoutes);
  app.use('/api/admin', adminRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

export default startServer;
