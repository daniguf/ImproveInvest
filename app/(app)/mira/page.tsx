import Mira from "@/components/features/mira/Mira";
import { getLocale } from "@/lib/i18n.server";

export default async function MiraPage() {
  const locale = await getLocale();

  return <Mira locale={locale} />;
}
