import { Router } from 'express';
import { createBook, getBook } from '../controllers/Book.controller';
import { validateCreateBook } from '../validators/Book/Book.create';

const router = Router();

// Apply validation middleware to the create book route
router.post('/books', validateCreateBook, createBook);
router.get('/books/:id', getBook);

export default router;
