import express from "express";
import { json } from "body-parser";
import userRoutes from "./routes/userRoutes";
import appInfoRoutes from "./routes/appinfoRoutes";
import faqRoutes from "./routes/faqRoutes";
import matchRoutes from "./routes/matchRoutes";
import predictionRoutes from "./routes/predictionRoutes";
import topupRoutes from "./routes/topupRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import withdrawRoutes from "./routes/withdrawRoutes";
import transacRoutes from "./routes/transactionsRoutes";
const app = express();
import passport from "passport";
import session from "express-session";
import cors from "cors";

app.use(cors()); 

app.use(
  session({
    secret: "nothingisasecretafterithasbeenrevealed",
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// parse requests of content-type - application/json
app.use(json());

app.use("/app-info", appInfoRoutes);
app.use("/faq", faqRoutes);
app.use("/match", matchRoutes);
app.use("/notification", notificationRoutes);
app.use("/prediction", predictionRoutes);
app.use("/topup", topupRoutes);
app.use("/user", userRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/transaction", transacRoutes)

export default app;
