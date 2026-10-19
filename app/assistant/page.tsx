import { t } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { getService } from "@/lib/services";
import Chat from "@/components/assistant/Chat";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI Assistant — SevaGuide AI",
  description:
    "Ask any question about Karnataka government services, eligibility, required documents, and application steps.",
};

export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const lang = await getLang();
  const dict = t(lang);

  const svc =
    service && /^[a-z0-9-]{1,100}$/.test(service)
      ? await getService(service).catch(() => null)
      : null;

  const initialName = svc
    ? lang === "kn" && svc.nameKn
      ? svc.nameKn
      : svc.name
    : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Chat
        lang={lang}
        dict={dict}
        initialSlug={svc?.slug}
        initialName={initialName}
      />
    </div>
  );
}
