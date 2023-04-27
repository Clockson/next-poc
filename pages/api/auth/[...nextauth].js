import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import OktaProvider from "next-auth/providers/okta";

export const authOptions = {
  secret: 'erichansberger',
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_ID,
      clientSecret: process.env.TWITCH_SECRET,
    }),
    OktaProvider({
      clientId: process.env.OKTA_ID,
      clientSecret: process.env.OKTA_SECRET,
      issuer: process.env.OKTA_ISSUER
    })
  ],
  callbacks: {
    async session ({session, token, user}) {
      console.log("Session callback");
      console.log(session);
      console.log(token);
      console.log(user);

      return session;
    }
  }
}
export default NextAuth(authOptions)