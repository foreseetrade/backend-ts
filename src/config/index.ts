import * as dotenv from "dotenv";

dotenv.config();

export const envSupabaseUrl = process.env.SUPABASE_URL || "";
export const envSupabaseKey = process.env.SUPABASE_KEY || "";
export const envJWTSecretKey = process.env.JWT_SECRET_KEY || "";
export const envPort = process.env.PORT || 3000;
export const envOTPLESS_CLIENT_ID = process.env.OTPLESS_CLIENT_ID || "";
export const envOTPLESS_CLIENT_SECRET = process.env.OTPLESS_CLIENT_SECRET || "";
export const envGOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const envGOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
