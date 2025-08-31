import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppError } from "../middlewares/error.middleware";
import { authService } from "../services/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new AppError("No email found in google profile"));
        }

        const { user } = await authService.googleAuth({
          providerId: profile.id,
          accessToken,
          refreshToken,
          displayName: profile.displayName,
          profileEmail: email,
        });

        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
