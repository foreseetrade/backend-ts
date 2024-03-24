// src/routes/userRoutes.ts
import express from "express";
import { envJWTSecretKey } from "../config"; // Ensure you have jwtSecret in your config
import jwt from "jsonwebtoken";
const router = express.Router();
import * as userService from "../services/userService";
import { passportInstance } from "../config/passport";
import { User } from "@prisma/client";

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
    console.log("req in Google Redirect", req);

    console.log("req.user", req.user);

    if (!req.user || !req?.user) {
      // Handle case where user is not authenticated or user ID is missing
      return res.status(401).send("Unauthorized");
    }

    const token = jwt.sign({ userId: req.user}, envJWTSecretKey, {
      expiresIn: "10d",
    });

    console.log("token", token);
    const userId = req.user;

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
