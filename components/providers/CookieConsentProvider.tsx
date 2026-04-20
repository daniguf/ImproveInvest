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
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

const CONSENT_KEY = "gdpr_consent_settings";

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [consent, setConsent] = useState<ConsentState>({
    essential: true, // Essential cookies (like locale) are always accepted
    analytics: false,
    marketing: false,
  });

  const [hasConsented, setHasConsented] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.consent) {
          setConsent(parsed.consent);
          setHasConsented(true);
        }
      } catch (e) {
        console.error("Failed to parse consent settings", e);
      }
    }
  }, []);

  const saveConsent = useCallback((state: ConsentState) => {
    setConsent(state);
    setHasConsented(true);
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        consent: state,
        timestamp: new Date().toISOString(),
      })
    );
  }, []);

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
