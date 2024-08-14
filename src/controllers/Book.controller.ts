import express, { Request, Response } from 'express';
import { getBooks } from '../services/book.services';

const router = express.Router();

router.get('.', async (req: Request, res: Response) => {
    try {
        console.log('asdasd');
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
