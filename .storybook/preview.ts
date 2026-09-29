import type { Preview } from "@storybook/nextjs-vite";
import { DEFAULT_LOCALE, LOCALE_LABELS } from "../lib/i18n";
import "../app/globals.css";
import nextIntl from "./next-intl";

const preview: Preview = {
  initialGlobals: {
    locale: DEFAULT_LOCALE,
    locales: LOCALE_LABELS,
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    nextIntl,
  },
};

export default preview;
