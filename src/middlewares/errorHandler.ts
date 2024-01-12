import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {    
    const formatedError = {
        code: (err as any).statusCode || 500,
        message: err.message || "An unknown error occured"
    };

    return res.status(formatedError.code).json({
        success: false,
        data: null,
        error: formatedError
    })
}