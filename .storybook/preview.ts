import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import nextIntl from "./next-intl";

const preview: Preview = {
  initialGlobals: {
    locale: "da",
    locales: {
      da: "Dansk",
      en: "English",
      de: "Deutsch",
    },
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
