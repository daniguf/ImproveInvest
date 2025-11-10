import da from "../messages/da.json";
import de from "../messages/de.json";
import en from "../messages/en.json";

// const messagesByLocale: Record<string, any> = { da, en, de };
const messagesByLocale: string[] = { da, en, de };

const nextIntl = {
  defaultLocale: "da",
  messagesByLocale,
};

export default nextIntl;
