import Mira from "@/components/features/mira/Mira";
import { cookies } from "next/headers";

export default async function MiraPage() {
  const store = await cookies();
  const locale = store.get("locale")?.value || "da";

  return <Mira locale={locale} />;
}
