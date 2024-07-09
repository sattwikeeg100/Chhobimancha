import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import { generateToken } from "../utils/authUtils.js";

const GoogleOauthConfig = {
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/oauth/google/callback`,
};

const GoogleOAuthStrategy = new GoogleStrategy(
    GoogleOauthConfig,
    async (accessToken, refreshToken, profile, done) => {
        try {
            const query = {
                $or: [
                    { googleId: profile.id },
                    { email: profile.emails[0].value },
                ],
            };
            let user = await User.findOne(query);
            if (!user) {
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                });
                await user.save();
            }
            done(null, user);
        } catch (error) {
            console.error("Error during user save:", error);
            done(error, null);
        }
    }
);

passport.use(GoogleOAuthStrategy);

export const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});

export const googleAuthCallback = (req, res) => {
    if (req.user) {
        const token = generateToken(req.user._id);
        res.redirect(`${process.env.SITE_URL}/oauth?token=${token}`);
    } else {
        res.status(401).send("Authentication failed");
    }
};