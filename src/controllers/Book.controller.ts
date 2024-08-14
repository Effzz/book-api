import { Request, Response } from 'express';
import prisma from '../utils/prisma.client';
import { sendResponse } from '../utils/response.mapper';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, content, publishedYear, genres, stock } = req.body;
        const newBook = await prisma.book.create({
            data: {
                title,
                author,
                content,
                publishedYear,
                stock,
                genres
            }
        });
        sendResponse(res, 201, true, newBook, 'Successfully create a new book');
    } catch {
        sendResponse(res, 400, true, null, 'Error creating book');
    }
};

export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Validate ID
        const bookId = parseInt(id, 10);
        if (isNaN(bookId)) {
            return sendResponse(res, 400, false, undefined, 'Invalid book ID');
        }

        const book = await prisma.book.findUnique({
            where: { id: bookId }
        });

        if (book) {
            sendResponse(res, 200, true, book, 'Book retrieved successfully');
        } else {
            sendResponse(res, 404, false, undefined, 'Book not found');
        }
    } catch (error) {
        const typedError = error as Error;
        sendResponse(res, 400, false, undefined, typedError.message);
    }
};
