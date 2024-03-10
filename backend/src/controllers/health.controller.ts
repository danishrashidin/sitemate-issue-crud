import { NextFunction, Request, Response } from "express";

export class HealthController {
    public async healthCheck(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            env: process.env.NODE_ENV,
            timestamp: new Date(),
        });
    }
}

export default new HealthController();