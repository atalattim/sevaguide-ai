import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const admins = () => (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
export const isAdminEmail = (email?: string | null) => !!email && admins().includes(email.toLowerCase());

// MVP: Google sign-in is only for admins. There are no public user accounts yet.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    signIn: ({ profile }) => profile?.email_verified === true && isAdminEmail(profile.email),
  },
});
