import express from "express";

// Routes
import healthRoute from "./routes/health.route";
import issuesRoute from "./routes/issues.route";

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(router);

// Health Check
app.use("/", healthRoute);

// Entry
app.use("/", issuesRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})