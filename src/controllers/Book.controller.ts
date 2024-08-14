import { Request, Response } from 'express';
import prisma from '../utils/prisma.client';
import { Prisma } from '@prisma/client';
import { sendResponse } from '../utils/response.mapper';
import { validationResult } from 'express-validator';

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
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError) {
            sendResponse(res, 400, false, validationResult(req), 'Failed to create book');
        } else if (error instanceof Error) {
            sendResponse(res, 400, false, undefined, JSON.stringify(error));
        } else {
            sendResponse(res, 500, false, undefined, 'An unknown error occurred');
        }
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

export const getAllBooks = async (req: Request, res: Response) => {
    const { search } = req.query;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    if (page < 1 || limit < 1) {
        return sendResponse(res, 400, false, undefined, 'Invalid pagination parameters');
    }

    try {
        // Calculate the offset
        const offset = (page - 1) * limit;

        let where: any = {};

        // Search filter applied to multiple fields
        if (search) {
            where = {
                OR: [
                    {
                        title: {
                            contains: search as string
                        }
                    },
                    {
                        content: {
                            contains: search as string
                        }
                    }
                ]
            };
        }

        // Fetch books with pagination
        const [books, totalBooks] = await Promise.all([
            prisma.book.findMany({
                where,
                skip: offset,
                take: limit
            }),
            prisma.book.count()
        ]);

        const paginationData = {
            page: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks
        };
        sendResponse(
            res,
            200,
            true,
            {
                ...paginationData,
                books
            },
            'Successfully get all books'
        );
    } catch (error) {
        if (error instanceof Error) {
            sendResponse(res, 500, false, undefined, error.message);
        } else {
            sendResponse(res, 500, false, undefined, 'An unknown error occurred');
        }
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, content, publishedYear, genres, stock } = req.body;

    try {
        // Validate ID
        const bookId = parseInt(id, 10);
        if (isNaN(bookId)) {
            return sendResponse(res, 400, false, undefined, 'Invalid book ID');
        }

        // Check if the book exists
        const existingBook = await prisma.book.findUnique({
            where: { id: bookId }
        });

        if (!existingBook) {
            return sendResponse(res, 404, false, undefined, 'Book not found');
        }

        // Update the book
        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: {
                title,
                author,
                content,
                publishedYear,
                stock,
                genres
            }
        });

        sendResponse(res, 200, true, updatedBook, 'Book updated successfully');
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError) {
            sendResponse(res, 400, false, validationResult(req), error.message);
        } else if (error instanceof Error) {
            sendResponse(res, 400, false, undefined, JSON.stringify(error.message));
        } else {
            sendResponse(res, 500, false, undefined, 'An unknown error occurred');
        }
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Ensure the ID is provided and valid
        if (!id) {
            return sendResponse(res, 400, false, undefined, 'Book ID is required');
        }

        // Attempt to delete the book
        const deletedBook = await prisma.book.delete({
            where: { id: Number(id) }
        });

        // Check if a book was deleted
        if (deletedBook) {
            sendResponse(res, 200, true, undefined, 'Book deleted successfully');
        } else {
            sendResponse(res, 404, false, undefined, 'Book not found');
        }
    } catch (error) {
        if (error instanceof Error) {
            sendResponse(res, 500, false, undefined, error.message);
        } else {
            sendResponse(res, 500, false, undefined, 'An unknown error occurred');
        }
    }
};
