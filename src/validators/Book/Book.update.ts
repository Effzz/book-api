import { body } from 'express-validator';

export const validateUpdateBook = [
    body('title').isString().withMessage('Title must be a string').notEmpty().withMessage('Title is required'),
    body('content').isString().optional().withMessage('Content must be a string if provided'),
    body('publishedYear').isNumeric().withMessage('Published Year should be numeric'),
    body('author').isString().withMessage('Author must be a string').notEmpty().withMessage('Author is required'),
    body('genres')
        .optional() // Make this optional if genres are not always provided
        .isArray({ min: 1 })
        .withMessage('Genres must be an array with at least one element')
        .custom((value) => {
            // Ensure each element in the array is a string
            if (value.every((item: string | undefined) => typeof item === 'string')) {
                return true;
            }

            throw new Error('All genres must be strings');
        }),
    body('stock').isNumeric().withMessage('Stock should be numeric')
];
