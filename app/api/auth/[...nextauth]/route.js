import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("Credentials:", credentials);

        const user = await User.findOne({ username: credentials.username });
        console.log("User:", user);

        if (!user) {
          throw new Error("No user found with the given username");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        // Return user details including Owner_id
        return { id: user._id, name: user.username, Owner_id: user.Owner_id }; // Include Owner_id
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add Owner_id to the token
      if (user) {
        token.Owner_id = user.Owner_id; // Save Owner_id in token
        token.sub = user.id; // Ensure id is saved as sub
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub; // Assign user ID to session
      session.user.Owner_id = token.Owner_id; // Include Owner_id in session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
