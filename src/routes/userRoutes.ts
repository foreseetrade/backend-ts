// src/routes/userRoutes.ts
import express from "express";
import { UserService } from "../services/userService";
import {
  envOTPLESS_CLIENT_ID,
  envOTPLESS_CLIENT_SECRET,
  envJWTSecretKey,
} from "../config"; // Ensure you have jwtSecret in your config
import jwt from "jsonwebtoken";
const router = express.Router();
const userService = new UserService();

// @ts-ignore
import { UserDetail } from "otpless-node-js-auth-sdk";

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

export default router;
