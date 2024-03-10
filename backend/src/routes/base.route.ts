import { Router } from "express";

export abstract class BaseRoute {
    protected router: Router;

    constructor() {
        this.router = Router({
            mergeParams: true,
        });
        this.initRoutes();
        console.log(`${this.constructor.name} created`);
    }

    public getRouter(): Router {
        return this.router;
    }

    protected abstract initRoutes(): void;
}