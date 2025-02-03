import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5002;
import productRoutes from './routes/productRoutes.js';
//Now we will import the userRoutes.js file in server.js.
import userRoutes from './routes/userRoutes.js';

connectDB(); // Connect to MongoDB
//here we create an instance of express and store it in the app variable. We then create a route for the home page that sends a response to the client. The response is the string 'API is running...'. This is a simple way to check if the server is running. If the server is running, the client will see this message when they visit the home page.
const app = express();
//Body parser middleware - here we have two app.use() functions. The first one is used to parse JSON data that is sent in the request.
// The second one is used to parse URL-encoded data. This is used to parse data that is sent in the URL. The extended option is set to true. This is used to parse nested objects in the URL-encoded data. If the extended option is set to false, only strings and arrays can be parsed. The extended option is set to true by default. For example, if the extended option is set to true, the following data can be parsed: name=John&age=30&address[city]=New+York&address[state]=NY. If the extended option is set to false, only the following data can be parsed: name=John&age=30. In our case  { email: 'john@email.com', password: '123456' } will be returned, if we set that data up in Postman to have body in x-www-form-urlencoded.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cookie parser middleware - here we are using the cookie-parser middleware
app.use(cookieParser());
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