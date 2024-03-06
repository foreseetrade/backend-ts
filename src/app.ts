import express from "express";
import { json } from "body-parser";
import userRoutes from "./routes/userRoutes";
import appInfoRoutes from "./routes/appinfoRoutes";
import faqRoutes from "./routes/faqRoutes";
import matchRoutes from "./routes/matchRoutes";
import predictionRoutes from "./routes/predictionRoutes";
import topupRoutes from "./routes/topupRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import withdrawRoutes from "./routes/withdrawRoutes";
import investmentsRoutes from "./routes/investmentRoutes";
const app = express();

app.use(json());

app.use("/app-info", appInfoRoutes);
app.use("/faq", faqRoutes);
app.use("/investment", investmentsRoutes);
app.use("/match", matchRoutes);
app.use("/notification", notificationRoutes);
app.use("/prediction", predictionRoutes);
app.use("/topup", topupRoutes);
app.use("/transaction", transactionRoutes);
app.use("/user", userRoutes);
app.use("/withdraw", withdrawRoutes);

export default app;
