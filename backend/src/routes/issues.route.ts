import { BaseRoute } from "./base.route";
import issuesController from "../controllers/issues.controller";

class IssuesRoute extends BaseRoute {
    constructor() {
        super();
    }

    protected initRoutes(): void {
        // Get All
        this.router.route("/issues").get(issuesController.getIssues)

        // Get One
        this.router.route("/issues/:id").get(issuesController.getIssue)

        // Create One
        this.router.route("/issue").post(issuesController.createIssue)

        // Update One
        this.router.route("/issue/:id").put(issuesController.updateIssue)

        // Delete One
        this.router.route("/issue/:id").delete(issuesController.deleteIssue)
    }
}

export default new IssuesRoute().getRouter();