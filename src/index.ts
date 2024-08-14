import express from 'express';
import dotenv from 'dotenv';
import booksRouter from './controllers/book.controller';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/books', booksRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
