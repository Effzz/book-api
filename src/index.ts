import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import BookRoutes from './routes/Book.routes';

dotenv.config();

const app = express();
app.use(express.json());

// Rate limiter configuration
const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Append routes
app.use('/api', apiLimiter, BookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default app;
