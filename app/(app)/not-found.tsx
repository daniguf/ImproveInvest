import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function AppNotFound() {
  const t = await getTranslations("errors");

  return (
    <MaxWidthWrapper>
      <h1 className="text-3xl font-bold text-white">{t("not_found_title")}</h1>
      <p className="mt-4 text-white">{t("not_found_description")}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded border border-white px-4 py-2 text-white transition-colors hover:bg-white hover:text-black"
      >
        {t("retry")}
      </Link>
    </MaxWidthWrapper>
  );
}
