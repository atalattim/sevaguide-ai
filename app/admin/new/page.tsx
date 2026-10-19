import ServiceForm from "@/components/admin/ServiceForm";
import { toForm } from "@/lib/validation/service";
export default function NewService() {
  return <ServiceForm initial={toForm(null)} />;
}
