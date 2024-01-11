import { AuthPayload } from "../dto";
import { Request, Response, NextFunction } from "express";
import { validateSignature } from "../utility";
import { TokenExpiredError } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isValidRequest = await validateSignature(req);
        if (isValidRequest) {
            return next();
        }

        return res.status(401).json({
            success: false,
            data: null,
            error: {
                message: "Unauthorized"
            }
        });
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                success: false,
                data: null,
                error: {
                    message: "Token expired"
                }
            });
        }

        next(error);
    }
}