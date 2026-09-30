"use client";

import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MaxWidthWrapper>
      <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
      <p className="mt-4 text-white">{t("description")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded border border-white px-4 py-2 text-white transition-colors hover:bg-white hover:text-black"
      >
        {t("retry")}
      </button>
    </MaxWidthWrapper>
  );
}
