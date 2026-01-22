import ContactForm from "@/components/features/contactForm/ContactForm";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("home");
  return (
    <div className="flex flex-col sm:flex-row gap-8 justify-center">
      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-white mb-6">{t("c448d41")}</h1>
        <p className="text-tertiary">{t("d142928")}</p>
        <p className="text-white flex flex-col font-bold">
          <span className="mb-6">{t("89eaa93")}</span>
          <span>{t("80dc7fb")}</span>
        </p>
      </div>
      <ContactForm />
    </div>
  );
};

export default Contact;
