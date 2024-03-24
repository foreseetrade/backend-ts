// src/routes/userRoutes.ts
import express from "express";
import {
  envOTPLESS_CLIENT_ID,
  envOTPLESS_CLIENT_SECRET,
  envJWTSecretKey,
} from "../config"; // Ensure you have jwtSecret in your config
import jwt from "jsonwebtoken";
const router = express.Router();
import * as userService from "../services/userService";
import { passportInstance } from "../config/passport";

// @ts-ignore
import { UserDetail } from "otpless-node-js-auth-sdk";
import { versions } from "process";

// Get  user by email
router.get("/getUser", async (req, res) => {
  const email = req.query.email;

  try {
    const user = await userService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update users by email
router.put("/updateUser", async (req, res) => {
  const { email, updatedUserData } = req.body;

  try {
    const updatedUser = await userService.updateUserByEmail(
      email,
      updatedUserData
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user by email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUserData = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, updatedUserData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Google Login using PassportJS
router.get(
  "/google",
  passportInstance.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Google OAuth callback route
router.get(
  "/google/redirect",
  passportInstance.authenticate("google"),
  (req, res) => {
    console.log("req.user", req.user);
    const token = jwt.sign({ userId: req.user }, envJWTSecretKey, {
      expiresIn: "10d",
    });
    console.log("token", token);
    const userId = JSON.stringify(req?.user);

    res.redirect(`foresee://app?jwt=${token}&userId=${userId}`);
  }
);

router.get("/logout", function (req, res) {
  console.log("logout called");
  req.session.destroy(function () {
    res.redirect("/");
  });
});

// get user by email

router.get("/email", async (req, res) => {
  const email = req.query.email;

  try {
    const user = await userService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
