import express from 'express';
import dotenv from 'dotenv';
import BookRoutes from './routes/Book.routes';

dotenv.config();

const app = express();
app.use(express.json());

// Append routes
app.use('/api', BookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
