import { DEFAULT_LOCALE } from "../lib/i18n";
import da from "../messages/da.json";
import de from "../messages/de.json";
import en from "../messages/en.json";

const messagesByLocale = { da, en, de };

const nextIntl = {
  defaultLocale: DEFAULT_LOCALE,
  messagesByLocale,
};

export default nextIntl;
