import { Book } from '../interfaces/book.interface';
import db from '../db/db';

export async function getBooks(): Promise<Book[]> {
    const [rows] = await db.query('SELECT * FROM books');

    if (Array.isArray(rows) && rows.length > 0 && typeof rows[0] === 'object') {
        const books = rows as Book[];
        return books;
    } else {
        throw new Error('Error retrieving books');
    }
}
