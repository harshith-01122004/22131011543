import { Request, Response, NextFunction } from 'express';
import { tog } from '../utils/logger';

export function errorLogger(pkg: string) {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        tog('backend', 'error', pkg as any, err.message)
            .catch(console.error);
        next(err);
    };
}
