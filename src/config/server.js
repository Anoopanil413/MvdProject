import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './database.js';
import userRoutes from '../routes/userRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import cors from 'cors';

const startServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  };
  
  app.use(cors(corsOptions));


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
