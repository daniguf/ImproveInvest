import { useTranslations } from "next-intl";
import { Fragment, type FC, type ReactNode } from "react";

// Reusable components for consistent styling and reduced duplication
const Section: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => (
  <section className="flex flex-col gap-2">
    <h4 className="text-base font-semibold">{title}</h4>
    {children}
  </section>
);

const Paragraph: FC<{ id: string }> = ({ id }) => {
  const t = useTranslations("priip-kid");
  return <p className="text-sm">{t(id)}</p>;
};

const Priip: FC = () => {
  const t = useTranslations("priip-kid");

  return (
    <article className="flex flex-col gap-y-8 mb-5 text-white">
      {/* Document Header */}
      <header className="flex flex-col gap-2">
        <h3 className="font-bold text-lg">{t("block_1")}</h3>
        <Paragraph id="block_2" />{" "}
        {/* Changed from <span> for better semantics */}
      </header>

      {/* Sections with mapped content for cleaner code */}
      <Section title={t("block_4")}>
        <Paragraph id="block_5" />
      </Section>

      <Section title={t("block_6")}>
        {["block_7", "block_8", "block_9", "block_10"].map((id) => (
          <Paragraph key={id} id={id} />
        ))}
      </Section>

      <Section title={t("block_11")}>
        {["block_12", "block_13", "block_14", "block_15", "block_16"].map(
          (id) => (
            <Paragraph key={id} id={id} />
          )
        )}
      </Section>

      <Section title={t("block_17")}>
        {[
          "block_18",
          "block_19",
          "block_20",
          "block_21",
          "block_22",
          "block_23",
          "block_24",
        ].map((id) => (
          <Paragraph key={id} id={id} />
        ))}
      </Section>

      {/* Performance Scenarios with properly structured table */}
      <Section title={t("block_25")}>
        <Paragraph id="block_26" />
        <Paragraph id="block_27" />

        <table className="table-auto w-full text-xs my-2">
          <thead>
            <tr className="border-b border-gray-400">
              <th colSpan={2} className="text-sm text-left font-semibold py-2">
                {t("block_28")}
              </th>
              <th className="text-sm text-left font-semibold py-2">
                {t("block_29")}
              </th>
              <th className="text-sm text-left font-semibold py-2">
                {t("block_30")}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                main: "block_31",
                sub1: "block_32",
                val1: "block_33",
                val2: "block_34",
                sub2: "block_35",
                val3: "block_36",
                val4: "block_37",
              },
              {
                main: "block_38",
                sub1: "block_32",
                val1: "block_39",
                val2: "block_39",
                sub2: "block_35",
                val3: "block_40",
                val4: "block_40",
              },
              {
                main: "block_41",
                sub1: "block_32",
                val1: "block_42",
                val2: "block_43",
                sub2: "block_35",
                val3: "block_44",
                val4: "block_45",
              },
              {
                main: "block_46",
                sub1: "block_32",
                val1: "block_47",
                val2: "block_48",
                sub2: "block_35",
                val3: "block_49",
                val4: "block_50",
              },
            ].map((row, idx) => (
              <Fragment key={idx}>
                <tr className="border-b border-gray-400">
                  <td rowSpan={2} className="py-2">
                    {t(row.main)}
                  </td>
                  <td className="py-2">{t(row.sub1)}</td>
                  <td className="py-2">{t(row.val1)}</td>
                  <td className="py-2">{t(row.val2)}</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="py-2">{t(row.sub2)}</td>
                  <td className="py-2">{t(row.val3)}</td>
                  <td className="py-2">{t(row.val4)}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Cost Over Time */}
      <Section title={t("block_52")}>
        {["block_53", "block_54", "block_55", "block_56"].map((id) => (
          <Paragraph key={id} id={id} />
        ))}

        <table className="table-auto w-full text-xs my-4">
          <thead>
            <tr className="border-b border-gray-400">
              <th colSpan={4} className="text-sm text-left font-semibold py-2">
                {t("block_57")}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Note: Some rows have fewer cells - this should be reviewed for semantic correctness */}
            {[
              ["block_58", "block_59", "block_60", "block_61"],
              ["block_62", "block_63", "block_64", ""],
              ["block_65", "block_66", "block_67", "block_68"],
              ["block_69", "block_70", "block_71", ""],
              ["block_72", "block_73", "block_74", "block_64"],
              ["block_75", "block_76", "block_77", ""],
            ].map((row, idx) => (
              <tr key={idx} className="border-b border-gray-400">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={`p-2 ${cellIdx === 0 ? "font-medium" : ""} ${cellIdx === row.length - 1 ? "" : "border-r"}`}
                  >
                    {cell ? t(cell) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <Paragraph id="block_78" />

        <table className="table-auto w-full text-xs my-4">
          <tbody>
            {[
              ["block_79", "block_80"],
              ["block_81", "block_82"],
              ["block_83", "block_84"],
            ].map((row, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2 font-medium border-r">{t(row[0])}</td>
                <td className="p-2">{t(row[1])}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Paragraph id="block_85" />
      </Section>

      {/* Withdrawal Info */}
      <Section title={t("block_86")}>
        <Paragraph id="block_87" />
      </Section>

      {/* Other Info */}
      <Section title={t("block_88")}>
        <Paragraph id="block_89" />
      </Section>

      {/* Contact Info */}
      <Section title={t("block_90")}>
        <Paragraph id="block_91" />
      </Section>
    </article>
  );
};

export default Priip;
