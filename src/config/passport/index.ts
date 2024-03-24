import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { envGOOGLE_CLIENT_ID, envGOOGLE_CLIENT_SECRET } from "..";
import prisma from "../../database/prisma";
import { User } from "@prisma/client";

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user: any, done) => {
  done(null, user?.userId); // Serialize using 'userId'
});

passport.deserializeUser(async (userId: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: userId }, // Deserialize using 'userId'
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error as Error);
  }
});

export const passportInstance = passport.use(
  new GoogleStrategy(
    {
      clientID: envGOOGLE_CLIENT_ID,
      clientSecret: envGOOGLE_CLIENT_SECRET,
      callbackURL: "/user/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);
        // Check if the user exists in the database
        let user = await prisma.user.findUnique({
          where: { userAuthId: profile.id },
        });

        if (!user) {
          // If the user does not exist, create a new user
          user = await prisma.user.create({
            data: {
              userAuthId: profile.id,
              userName: profile.displayName,
              userEmail: profile.emails ? profile.emails[0].value : "",
              userPfpUrl: profile._json.picture ? profile._json.picture : "",
              userPhone: "",
            } as User,
          });
        }

        // Pass the user to the next middleware
        return done(null, user);
      } catch (error) {
        // Handle error
        console.error("Error in Google OAuth strategy:", error);
        return done(error as Error);
      }
    }
  )
);
