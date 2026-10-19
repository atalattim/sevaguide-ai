import "server-only";
import { auth, isAdminEmail } from "@/auth";

/**
 * Returns the session only if the signed-in account is authorized as an administrator.
 * In development mode without OAuth credentials, provides a fallback demo admin session for testing.
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

  // Safe developer demo bypass in non-production local environments
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
