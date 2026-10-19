import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ServiceForm from "@/components/admin/ServiceForm";
import { toForm } from "@/lib/validation/service";

export default async function EditService({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const svc = await db.governmentService.findUnique({ where: { id } });
  if (!svc) notFound();
  return <ServiceForm id={svc.id} initial={toForm(svc)} />;
}
