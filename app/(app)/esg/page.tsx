import { useTranslations } from "next-intl";

const TextBlock = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-y-4">{children}</div>;
};

const Header = ({ headerValue }: { headerValue: string }) => {
  return <h3 className="text-md font-bold">{headerValue}</h3>;
};

const Paragraph = ({ paragraphValue }: { paragraphValue: string }) => {
  return <p className="text-sm">{paragraphValue}</p>;
};

const ESG = () => {
  const t = useTranslations("esg");

  const tableRows = [
    [t("table.row_1.col_1"), t("table.row_1.col_2")],
    [t("table.row_2.col_1"), t("table.row_2.col_2")],
    [t("table.row_3.col_1"), t("table.row_3.col_2")],
    [t("table.row_4.col_1"), t("table.row_4.col_2")],
    [t("table.row_5.col_1"), t("table.row_5.col_2")],
  ];
  return (
    <div className="w-full flex flex-col gap-y-14">
      <section className="">
        <h1 className="mb-8 font-bold text-3xl">
          {t("esg_page_header_primary")}
        </h1>
        <table className="table-auto">
          <tbody className="">
            {tableRows.map((item) => (
              <tr key={item[0]} className="text-sm border-b border-gray-400">
                <td className="align-text-top text-nowrap p-4 border-r-2 border-gray-500">
                  {item[0]}
                </td>
                <td className="p-4">{item[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <article className="flex flex-col gap-y-8">
          <TextBlock>
            <Header headerValue={t("block_1.header")} />
            <Paragraph paragraphValue={t("block_1.paragraph")} />
          </TextBlock>
          <TextBlock>
            <Header headerValue={t("block_2.header")} />
            <Paragraph paragraphValue={t("block_2.paragraph_1")} />
            <Paragraph paragraphValue={t("block_2.paragraph_2")} />
          </TextBlock>
          <TextBlock>
            <Header headerValue={t("block_3.header")} />
            <Paragraph paragraphValue={t("block_3.paragraph_1")} />
            <Paragraph paragraphValue={t("block_3.paragraph_2")} />
            <Paragraph paragraphValue={t("block_3.paragraph_3")} />
            <Paragraph paragraphValue={t("block_3.paragraph_4")} />
            <Paragraph paragraphValue={t("block_3.paragraph_5")} />
            <Paragraph paragraphValue={t("block_3.paragraph_6")} />
            <Paragraph paragraphValue={t("block_3.paragraph_7")} />
            <Paragraph paragraphValue={t("block_3.paragraph_8")} />
          </TextBlock>
          <TextBlock>
            <Header headerValue={t("block_4.header")} />
            <Paragraph paragraphValue={t("block_4.paragraph")} />
          </TextBlock>
          <TextBlock>
            <Header headerValue={t("block_5.header")} />
            <Paragraph paragraphValue={t("block_5.paragraph")} />
          </TextBlock>
          <TextBlock>
            <Header headerValue={t("block_6.header")} />
            <Paragraph paragraphValue={t("block_6.paragraph")} />
          </TextBlock>
        </article>
      </section>
    </div>
  );
};

export default ESG;
