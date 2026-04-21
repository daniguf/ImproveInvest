// components/providers/CookieConsentProvider.tsx
"use client";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  consent: ConsentState;
  hasConsented: boolean;
  acceptAll: () => void;
  declineNonEssential: () => void;
  // eslint-disable-next-line no-unused-vars
  updateConsent: (state: ConsentState) => void;
  isLogging: boolean;
  forceShowBanner: boolean;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

const CONSENT_KEY = "gdpr_consent_settings";
const POLICY_VERSION = "1.0"; // Update when policy changes
const CONSENT_EXPIRATION_DAYS = 365; // EDPB recommends 12-24 months

// Check if stored consent has expired
function isConsentExpired(stored: {
  timestamp: string;
  policyVersion: string;
}): boolean {
  // Expire if policy version changed
  if (stored.policyVersion !== POLICY_VERSION) return true;

  // Expire if time-based expiration reached
  const consentDate = new Date(stored.timestamp);
  const expiryDate = new Date(consentDate);
  expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRATION_DAYS);
  return new Date() > expiryDate;
}

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let sessionId = sessionStorage.getItem("consent_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem("consent_session_id", sessionId);
  }
  return sessionId;
}

// Server-side consent logging (debounced to avoid duplicate logs)
let logDebounceTimer: NodeJS.Timeout | null = null;

async function logConsentToServer(
  consent: ConsentState,
  locale: string
): Promise<void> {
  if (logDebounceTimer) {
    clearTimeout(logDebounceTimer);
  }

  logDebounceTimer = setTimeout(async () => {
    try {
      const response = await fetch("/api/consent-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consentState: consent,
          policyVersion: POLICY_VERSION,
          locale,
          sessionId: getSessionId(),
        }),
      });

      if (!response.ok) {
        console.error("Failed to log consent server-side");
      }
    } catch (error) {
      console.error("Consent logging error:", error);
    }
  }, 1000); // 1 second debounce
}

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const [hasConsented, setHasConsented] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [forceShowBanner, setForceShowBanner] = useState(false);
  const [locale, setLocale] = useState("da");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    // Get locale from cookie or default
    const storedLocale =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("locale="))
        ?.split("=")[1] || "da";
    setLocale(storedLocale);

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.consent) {
          // Check if consent has expired or policy changed
          if (
            isConsentExpired({
              timestamp: parsed.timestamp,
              policyVersion: parsed.policyVersion,
            })
          ) {
            // Expired: clear old consent and force banner re-display
            localStorage.removeItem(CONSENT_KEY);
            setForceShowBanner(true);
          } else {
            // Valid consent: restore state
            setConsent(parsed.consent);
            setHasConsented(true);
          }
        } else {
          setForceShowBanner(true);
        }
      } catch (e) {
        console.error("Failed to parse consent settings", e);
        localStorage.removeItem(CONSENT_KEY);
        setForceShowBanner(true);
      }
    } else {
      // No stored consent: show banner
      setForceShowBanner(true);
    }
  }, []);

  const saveConsent = useCallback(
    (state: ConsentState) => {
      setConsent(state);
      setHasConsented(true);
      setForceShowBanner(false); // Hide banner after saving
      setIsLogging(true);

      // Save to localStorage for client-side persistence
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({
          consent: state,
          timestamp: new Date().toISOString(),
          policyVersion: POLICY_VERSION,
        })
      );

      // Log to server for audit trail
      logConsentToServer(state, locale);

      // Reset logging state after delay
      setTimeout(() => setIsLogging(false), 2000);
    },
    [locale]
  );

  const acceptAll = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  }, [saveConsent]);

  const declineNonEssential = useCallback(() => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  }, [saveConsent]);

  const updateConsent = useCallback(
    (state: ConsentState) => {
      saveConsent({ ...state, essential: true }); // Essential cannot be declined
    },
    [saveConsent]
  );

  // Only render children on client to avoid hydration mismatch
  if (!isClient) return null;

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsented,
        acceptAll,
        declineNonEssential,
        updateConsent,
        isLogging,
        forceShowBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
};
