import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5002;
import productRoutes from './routes/productRoutes.js';
//Now we will import the userRoutes.js file in server.js.
import userRoutes from './routes/userRoutes.js';

connectDB(); // Connect to MongoDB
const app = express();
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
//We will now use the userRoutes in the server.js file. What we are doing here is using the userRoutes for all the routes that start with /api/users. So, if the user sends a request to /api/users, the userRoutes will handle the request. app.use is a function in express js that is used to mount the specified middleware function or functions at the specified path. In this case, we are mounting the userRoutes at the path /api/users.
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});