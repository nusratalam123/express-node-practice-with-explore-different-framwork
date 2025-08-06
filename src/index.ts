import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './route/product.route';
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './swagger/swaggerOptions';
import metricsApp, { metricsMiddleware } from './metrics'; 
import logger from './logger';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));


connectDB();

// Use Prometheus metrics middleware
app.use(metricsMiddleware); 


app.use('/products', productRoutes);

// Mount /metrics endpoint separately
app.use(metricsApp); 

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});



// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db';
// import productRoutes from './route/product.route';
// import swaggerUi from 'swagger-ui-express';
// import { openApiDocument } from './swagger/swaggerOptions';

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Swagger docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// app.use(express.json());
// connectDB();

// app.use('/products', productRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
