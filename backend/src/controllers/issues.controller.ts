import { Request, Response } from "express";
import { Issue } from "../models/issue.model";

const issues: Issue[] = [];
class IssueController {

    constructor() {
        console.log(`${this.constructor.name} created`);
    }

    getIssues(req: Request, res: Response) {
        // Send response
        res.status(200).json(issues);
    }

    getIssue(req: Request, res: Response) {
        const id = req.params.id;
        // Get issue
        const issue = issues.find(i => i.id === id);
        // Send response
        res.status(200).json(issue);
    }

    createIssue(req: Request, res: Response) {
        // Create new issue object
        const issue = new Issue(req.body.title, req.body.description);
        // Print issue
        console.log(issue);
        // Add to store
        issues.push(issue);
        // Send response
        res.status(200).json(issue);
    }

    updateIssue(req: Request, res: Response) {
        const id = req.params.id;
        // Get issue
        const issue = issues.find(i => i.id === id);
        if (issue) {
            issue.title = req.body.title;
            issue.description = req.body.description;
        }
        // Print updated issue
        console.log(issue);
        // Send responce
        res.status(200).json(issue);
    }

    deleteIssue(req: Request, res: Response) {
        const id = req.params.id;
        // Get issue
        const issue = issues.find(i => i.id === id);
        if (issue) {
            // Print issue
            console.log(issue);
            // Delete issue
            issues.splice(issues.indexOf(issue), 1);
        }
        // Send response
        res.status(200).json(issue);
    }
}

export default new IssueController();