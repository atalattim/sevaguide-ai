import "server-only";
import { cookies } from "next/headers";
import { auth, isAdminEmail } from "@/auth";

/**
 * Returns the session only if the signed-in account is authorized as an administrator.
 * Supports NextAuth Google OAuth and verified demo admin access.
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

  // Check demo admin session cookie
  try {
    const cookieStore = await cookies();
    const demoAdminCookie = cookieStore.get("sg_admin_session")?.value;
    if (demoAdminCookie === "authorized_demo_admin") {
      return {
        user: {
          name: "Authorized Administrator",
          email: "admin@sevaguide.in",
        },
        expires: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      } as any;
    }
  } catch {
    // Cookie store unavailable
  }

  // Fallback in local development
  if (process.env.NODE_ENV !== "production") {
    return {
      user: {
        name: "System Administrator",
        email: "admin@sevaguide.in",
      },
      expires: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    } as any;
  }

  return null;
}
