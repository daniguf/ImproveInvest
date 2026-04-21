"use client";

import {
  ConsentState,
  useCookieConsent,
} from "@/components/providers/CookieConsentProvider";
import { BarChart3, Check, Megaphone, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function CookieBanner() {
  const t = useTranslations("cookie_banner");
  const {
    hasConsented,
    acceptAll,
    declineNonEssential,
    updateConsent,
    consent,
    forceShowBanner,
  } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [localConsent, setLocalConsent] = useState<ConsentState>(consent);

  if (hasConsented && !forceShowBanner) return null;

  const handleCustomSave = () => {
    updateConsent(localConsent);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 sm:p-6 transition-transform duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">{t("heading")}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {t.rich("description", {
                cookiePolicy: (chunks) => (
                  <a href="/cookies" className="text-blue-600 hover:underline">
                    {chunks}
                  </a>
                ),
                gdprPolicy: (chunks) => (
                  <a href="/gdpr" className="text-blue-600 hover:underline">
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {showDetails ? t("actions.hide") : t("actions.customize")}
            </button>
            <button
              onClick={declineNonEssential}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
            >
              {t("actions.decline")}
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {t("actions.accept_all")}
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid gap-4 sm:grid-cols-3">
            <ConsentToggle
              label={t("categories.essential.label")}
              description={t("categories.essential.description")}
              icon={<Shield className="w-4 h-4" />}
              checked={true}
              onChange={() => {}}
              disabled={true}
            />
            <ConsentToggle
              label={t("categories.analytics.label")}
              description={t("categories.analytics.description")}
              icon={<BarChart3 className="w-4 h-4" />}
              checked={localConsent.analytics}
              onChange={(v) =>
                setLocalConsent((prev) => ({ ...prev, analytics: v }))
              }
            />
            <ConsentToggle
              label={t("categories.marketing.label")}
              description={t("categories.marketing.description")}
              icon={<Megaphone className="w-4 h-4" />}
              checked={localConsent.marketing}
              onChange={(v) =>
                setLocalConsent((prev) => ({ ...prev, marketing: v }))
              }
            />
            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={handleCustomSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {t("actions.save")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ConsentToggleProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function ConsentToggle({
  label,
  description,
  icon,
  checked,
  onChange,
  disabled = false,
}: ConsentToggleProps) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border ${disabled ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"}`}
    >
      <div className={`mt-0.5 ${disabled ? "text-gray-400" : "text-blue-600"}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span
            className={`font-semibold text-sm ${disabled ? "text-gray-500" : "text-gray-900"}`}
          >
            {label}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
            />
            <div
              className={`w-9 h-5 ${disabled ? "bg-gray-300" : "bg-gray-200"} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600`}
            ></div>
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
