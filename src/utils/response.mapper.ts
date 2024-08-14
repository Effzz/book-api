import { Response } from 'express';

interface ApiResponse<T> {
    status: boolean;
    data?: T;
    message?: string;
}

export const sendResponse = <T>(res: Response, statusCode: number, status: boolean, data?: T, message?: string) => {
    const response: ApiResponse<T> = {
        status,
        data,
        message
    };

    res.status(statusCode).json(response);
};
