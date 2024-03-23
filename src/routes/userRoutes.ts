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

// Route for verifying otpless-token
router.post("/verify-token", async (req, res) => {
  try {
    const { ipToken } = req.body;

    // Assuming UserDetail.verifyToken is a function that verifies the token and returns the user details
    const userDetail = await UserDetail.verifyToken(
      ipToken,
      envOTPLESS_CLIENT_ID,
      envOTPLESS_CLIENT_SECRET
    );

    if (!userDetail || !userDetail.success) {
      return res.status(400).json({ error: "Invalid token" });
    }

    console.log("User details:", userDetail);

    const { name, authentication_details } = userDetail;
    const { email, phone } = authentication_details;

    // Check if the user already exists in the database based on email or phone number
    const existingUser = await userService.findUserByEmailOrPhone(
      email?.email || "",
      phone?.phone || ""
    );

    if (existingUser) {
      // User already exists, you might want to update the user details if needed
      // Example: await userService.updateUser(existingUser.id, { name, email: email?.email, phone: phone?.phone });

      const token = jwt.sign({ userId: existingUser.userId }, envJWTSecretKey, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        resType: "success",
        message: "User already exists, details updated",
        data: existingUser,
        token,
      });
    }

    // User doesn't exist, store the user in the database
    const newUser = await userService.createUser(
      name,
      email?.email || "",
      phone?.phone || ""
    );

    const token = jwt.sign({ userId: newUser.userId }, envJWTSecretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      resType: "success",
      message: "Token verified successfully and user stored in DB",
      data: newUser,
      token,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/getUserById", async (req, res) => {
//   const userId = req.query.userId;

//   try {
//     const user = await userService.getUserById(userId);
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user by ID:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

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
    const token = jwt.sign({ user: req.user }, envJWTSecretKey, {
      expiresIn: "1h",
    });
    console.log("token", token);
    console.log("req.user", req.user);
    const email = JSON.stringify(req?.user);
    res.redirect(
      `foresee://app?jwt=${token}&user=${JSON.stringify(req?.user)}`
    );
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
