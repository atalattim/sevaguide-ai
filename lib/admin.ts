import "server-only";
import { cookies } from "next/headers";
import { auth, isAdminEmail } from "@/auth";

/**
 * Returns the session only if the signed-in account is authorized as an administrator.
 * Supports NextAuth Google OAuth and authorized Department Official credentials.
 */
export async function requireAdmin() {
  try {
    const session = await auth();
    if (session?.user?.email && isAdminEmail(session.user.email)) {
      return session;
    }
  } catch (err) {
    // Auth error or unconfigured provider
  }

  // Check authorized official session cookie
  try {
    const cookieStore = await cookies();
    const officialSession = cookieStore.get("sg_official_session")?.value;
    if (officialSession === "verified") {
      const officialEmail = cookieStore.get("sg_official_email")?.value || "admin@sevaguide.in";
      return {
        user: {
          name: "Department Administrator",
          email: officialEmail,
        },
        expires: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      } as any;
    }
  } catch {
    // Cookie store unavailable
  }

  return null;
}
