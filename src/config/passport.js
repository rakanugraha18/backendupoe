import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/users/auth/google/callback`, // Lebih fleksibel
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id });

        if (!user) {
          user = new User({
            oauthProvider: "google",
            oauthId: profile.id,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            email: profile.emails?.[0]?.value || "",
            avatar: profile.photos?.[0]?.value || "",
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user untuk session
passport.serializeUser((user, done) => {
  done(null, user._id); // Simpan hanya ID user, bukan seluruh objek
});

// Deserialize user dari session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password"); // Jangan kirim password
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.serializeUser((user, done) => {
  done(null, user.id); // Simpan user.id ke session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Ambil user dari DB
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
