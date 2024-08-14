import express, { Request, Response } from 'express';
import { getBooks } from 'src/services/Book.services';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
