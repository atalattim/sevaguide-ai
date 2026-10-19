import "server-only";
import { cookies } from "next/headers";
import { LANGS, type Lang } from "./i18n";

export async function getLang(): Promise<Lang> {
  try {
    const cookieStore = await cookies();
    const v = cookieStore.get("lang")?.value;
    return (LANGS as readonly string[]).includes(v ?? "") ? (v as Lang) : "en";
  } catch {
    return "en";
  }
}
