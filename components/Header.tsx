import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { auth, isAdminEmail } from "@/auth";
import Navbar from "./Navbar";

export default async function Header() {
  const lang = await getLang();
  const dict = t(lang);
  let userEmail: string | null = null;
  let isAdmin = false;

  try {
    const session = await auth();
    userEmail = session?.user?.email ?? null;
    isAdmin = isAdminEmail(userEmail);
  } catch {
    // Auth fallback
  }

  return <Navbar lang={lang} dict={dict} userEmail={userEmail} isAdmin={isAdmin} />;
}
