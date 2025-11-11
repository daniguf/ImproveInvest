import da from "../messages/da.json";
import de from "../messages/de.json";
import en from "../messages/en.json";

// NO IMPLICIT 'any' type
// const messagesByLocale: Record<string, any> = { da, en, de };

const messagesByLocale = { da, en, de };

const nextIntl = {
  defaultLocale: "da",
  messagesByLocale,
};

export default nextIntl;
