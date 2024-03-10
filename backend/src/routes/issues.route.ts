import { BaseRoute } from "./base.route";
import issuesController from "../controllers/issues.controller";

class IssuesRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initRoutes(): void {
        // Get All
        // this.router.route("/issues").get(issuesController)

        // Get One
        // this.router.route("/issues/:id").get(issuesController)

        // Create One
        // this.router.route("/issue").post(issuesController)

        // Update One
        // this.router.route("/issue/:id").put(issuesController)

        // Delete One
        // this.router.route("/issue/:id").delete(issuesController)
    }
}

export default new IssuesRoute().getRouter();