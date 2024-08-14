import { Router } from 'express';
import { createBook, getBook, getAllBooks, updateBook, deleteBook } from '../controllers/Book.controller';
import { validateCreateBook } from '../validators/Book/Book.create';
import { validateUpdateBook } from '../validators/Book/Book.update';

const router = Router();

// BOOKS
router.post('/books', validateCreateBook, createBook);
router.get('/books/:id', getBook);
router.get('/books', getAllBooks);
router.put('/books/:id', validateUpdateBook, updateBook);
router.delete('/books/:id', deleteBook);

export default router;
