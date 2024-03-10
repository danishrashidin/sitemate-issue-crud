import { BaseRoute } from "./base.route";
import healthController from "../controllers/health.controller";

class HealthRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initRoutes(): void {
        this.router.route("/health-check").get(healthController.healthCheck)
    }
}

export default new HealthRoute().getRouter();