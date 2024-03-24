import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { envGOOGLE_CLIENT_ID, envGOOGLE_CLIENT_SECRET } from "..";
import prisma from "../../database/prisma";
import { User } from "@prisma/client";

const GoogleStrategy = passportGoogle.Strategy;

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
            // You can add other profile details here
            // Example:
            // email: profile.emails[0].value,
            // name: profile.displayName
          });
        }

        // Pass the user to the next middleware
        return done(null, user?.userEmail as any);
      } catch (error) {
        // Handle error
        console.error("Error in Google OAuth strategy:", error);
        return done(error as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user?.userAuthId); // Assuming 'id' is the unique identifier
});

passport.deserializeUser(async (userAuthId: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userAuthId: userAuthId },
    });
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error as Error);
  }
});
