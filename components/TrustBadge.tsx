import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export default function TrustBadge({ verified, date, lang }: { verified: boolean; date: Date | null; lang: Lang }) {
  const s = t(lang);
  const d = date ? new Intl.DateTimeFormat(lang === "kn" ? "kn-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" }).format(date) : null;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${verified ? "bg-green-50 text-green-900" : "bg-amber-50 text-amber-900"}`}>
      <span aria-hidden>{verified ? "🟢" : "🟡"}</span>
      {verified ? s.verified : s.needsVerification}
      {verified && d ? <span className="font-normal">· {s.lastVerified}: {d}</span> : null}
    </span>
  );
}
