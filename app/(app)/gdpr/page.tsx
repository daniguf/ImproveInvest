import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import { useTranslations } from "next-intl";

const TextBlock = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-y-4">{children}</div>;
};

const Header = ({ children }: { children: string }) => {
  return <h3 className="text-md font-bold">{children}</h3>;
};

const Paragraph = ({ children }: { children: string }) => {
  return <p className="text-sm">{children}</p>;
};

const GDPR = () => {
  const t = useTranslations("gdpr");
  return (
    <MaxWidthWrapper>
      <article className="flex flex-col gap-y-8 mb-5 text-white">
        <h1 className="mb-8 font-bold text-3xl">GDPR</h1>
        <TextBlock>
          <Header>{t("data_controller.heading")}</Header>
          <Paragraph>{t("data_controller.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("processing_activities.heading")}</Header>
          <Paragraph>{t("processing_activities.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("website_visit.heading")}</Header>
          <Paragraph>{t("website_visit.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("communication_with_potential_customers.heading")}</Header>
          <Paragraph>
            {t("communication_with_potential_customers.paragraph_1")}
          </Paragraph>
          <Paragraph>
            {t("communication_with_potential_customers.paragraph_2")}
          </Paragraph>
          <Paragraph>
            {t("communication_with_potential_customers.paragraph_3")}
          </Paragraph>
          <Paragraph>
            {t("communication_with_potential_customers.paragraph_4")}
          </Paragraph>
          <Paragraph>
            {t("communication_with_potential_customers.paragraph_5")}
          </Paragraph>
          <Paragraph>
            {t("communication_with_potential_customers.paragraph_6")}
          </Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("customers.heading")}</Header>
          <Paragraph>{t("customers.paragraph_1")}</Paragraph>
          <Paragraph>{t("customers.paragraph_2")}</Paragraph>
          <Paragraph>{t("customers.paragraph_3")}</Paragraph>
        </TextBlock>

        <TextBlock>
          <Header>{t("newsletter.heading")}</Header>
          <Paragraph>{t("newsletter.paragraph_1")}</Paragraph>
          <Paragraph>{t("newsletter.paragraph_2")}</Paragraph>
          <Paragraph>{t("newsletter.paragraph_3")}</Paragraph>
          <Paragraph>{t("newsletter.paragraph_4")}</Paragraph>
          <Paragraph>{t("newsletter.paragraph_5")}</Paragraph>
          <Paragraph>{t("newsletter.paragraph_6")}</Paragraph>
        </TextBlock>

        <TextBlock>
          <Header>{t("accounting.heading")}</Header>
          <Paragraph>{t("accounting.paragraph_1")}</Paragraph>
          <Paragraph>{t("accounting.paragraph_2")}</Paragraph>
          <Paragraph>{t("accounting.paragraph_3")}</Paragraph>
          <Paragraph>{t("accounting.paragraph_4")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("job_applications.heading")}</Header>
          <Paragraph>{t("job_applications.paragraph_1")}</Paragraph>
          <Paragraph>{t("job_applications.paragraph_2")}</Paragraph>
          <Paragraph>{t("job_applications.paragraph_3")}</Paragraph>
          <Paragraph>{t("job_applications.paragraph_4")}</Paragraph>
          <Paragraph>{t("job_applications.paragraph_5")}</Paragraph>
        </TextBlock>

        <TextBlock>
          <Header>{t("data_processors.heading")}</Header>
          <Paragraph>{t("data_processors.paragraph_1")}</Paragraph>
          <Paragraph>{t("data_processors.paragraph_2")}</Paragraph>
          <Paragraph>{t("data_processors.paragraph_3")}</Paragraph>
          <Paragraph>{t("data_processors.paragraph_4")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("disclosure_of_personal_data.heading")}</Header>
          <Paragraph>{t("disclosure_of_personal_data.paragraph_1")}</Paragraph>
          <Paragraph>
            {t("profiling_and_automated_decisions.heading")}
          </Paragraph>
          <Paragraph>
            {t("profiling_and_automated_decisions.paragraph_1")}
          </Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("third_country_transfers.heading")}</Header>
          <Paragraph>{t("third_country_transfers.paragraph_1")}</Paragraph>
          <Paragraph>{t("third_country_transfers.paragraph_2")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("processing_security.heading")}</Header>
          <Paragraph>{t("processing_security.paragraph_1")}</Paragraph>
          <Paragraph>{t("processing_security.paragraph_2")}</Paragraph>
          <Paragraph>{t("processing_security.paragraph_3")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("rights_of_the_data_subjects.heading")}</Header>
          <Paragraph>{t("rights_of_the_data_subjects.paragraph_1")}</Paragraph>
          <Paragraph>{t("rights_of_the_data_subjects.paragraph_2")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("right_of_access.heading")}</Header>
          <Paragraph>{t("right_of_access.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("right_to_rectification.heading")}</Header>
          <Paragraph>{t("right_to_rectification.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("right_to_erasure.heading")}</Header>
          <Paragraph>{t("right_to_erasure.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>{t("right_to_restriction_of_processing.heading")}</Header>
          <Paragraph>{t("right_to_data_portability.paragraph_1")}</Paragraph>
        </TextBlock>

        <TextBlock>
          <Header>{t("right_to_object.heading")}</Header>
          <Paragraph>{t("right_to_object.paragraph_1")}</Paragraph>
        </TextBlock>

        <TextBlock>
          <Header>{t("right_to_data_portability.heading")}</Header>
          <Paragraph>{t("right_to_data_portability.paragraph_1")}</Paragraph>
        </TextBlock>

        <TextBlock>
          <Header>{t("withdrawal_of_consent.heading")}</Header>
          <Paragraph>{t("withdrawal_of_consent.paragraph_1")}</Paragraph>
        </TextBlock>
        <TextBlock>
          <Header>
            {t("complaint_to_the_danish_data_protection_agency.heading")}
          </Header>
          <Paragraph>
            {t("complaint_to_the_danish_data_protection_agency.paragraph_1")}
          </Paragraph>
          <Paragraph>
            {t("complaint_to_the_danish_data_protection_agency.paragraph_2")}
          </Paragraph>
        </TextBlock>
      </article>
    </MaxWidthWrapper>
  );
};

export default GDPR;
