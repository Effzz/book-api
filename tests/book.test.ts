import request from 'supertest';
import app from '../src/index'; // Adjust the import path to match your project structure
import { expect } from '@jest/globals'; // Jest global expect
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.$connect();
    jest.spyOn(global.console, 'log').mockImplementation((...args) => {
        console.info(...args);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Books API', () => {
    let testBookId: number;

    // Test for creating a book
    it('should create a new book', async () => {
        const response = await request(app)
            .post('/api/books')
            .send({
                title: 'New Book',
                author: 'Author Name',
                content: 'Content of the book',
                publishedYear: 2024,
                genres: ['fiction', 'drama'],
                stock: 10
            });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toHaveProperty('title', 'New Book');
        testBookId = response.body.data.id;
    });

    it('should get a book by ID', async () => {
        // Use the ID from the creation step
        const response = await request(app).get(`/api/books/${testBookId}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toHaveProperty('id', testBookId);
    });

    it('should get all books with pagination', async () => {
        const response = await request(app).get('/api/books?page=1&limit=1');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data.books).toBeInstanceOf(Array);
    });

    it('should update a book', async () => {
        // Use the ID from the creation step
        const response = await request(app).put(`/api/books/${testBookId}`).send({ title: 'Updated Book Title' });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toHaveProperty('title', 'Updated Book Title');
    });

    // Test for deleting a book
    it('should delete a book', async () => {
        // Use the ID from the creation step
        const response = await request(app).delete(`/api/books/${testBookId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Book deleted successfully');
    });
});
