import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import SubHeading from "@/components/ui/subHeading/SubHeading";
import { useMessages } from "next-intl";
import Link from "next/link";

const Investors = () => {
  const messages = useMessages();
  const bodyContentHeading = messages.investors.articles.heading;
  const bodyContentArticle1 = messages.investors.articles.article_1;
  return (
    <section className="h-full w-full text-white text-sm">
      <MaxWidthWrapper>
        <div className="w-full h-full px-32">
          <div className="mb-16">
            <Heading>{bodyContentHeading}</Heading>
          </div>
          {/* Section 1 */}
          <div className="py-4">
            <SubHeading>{bodyContentArticle1.section_1.subheading}</SubHeading>
            <p className="py-4">
              {bodyContentArticle1.section_1.paragraphs.p1}
            </p>
            <div>
              <ol className="list-decimal px-8">
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[0]
                        .heading
                    }
                  </div>
                  <p>
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[0]
                        .description
                    }
                  </p>
                </li>
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[1]
                        .heading
                    }
                  </div>
                  <p>
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[1]
                        .description
                    }
                  </p>
                </li>
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[2]
                        .heading
                    }
                  </div>
                </li>
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[3]
                        .heading
                    }
                  </div>
                  <p>
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[3]
                        .description
                    }
                  </p>
                </li>
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[4]
                        .heading
                    }
                  </div>
                  <p>
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[4]
                        .description
                    }
                  </p>
                </li>
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[5]
                        .heading
                    }
                  </div>
                  <p>
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[5]
                        .description
                    }
                  </p>
                </li>
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[6]
                        .heading
                    }
                  </div>
                  <p>
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[6]
                        .description
                    }
                  </p>
                </li>
                <li>
                  <div className="font-bold">
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[6]
                        .heading
                    }
                  </div>
                  <p>
                    {
                      bodyContentArticle1.section_1.paragraphs.p2.points[6]
                        .description
                    }
                  </p>
                </li>
              </ol>
            </div>
          </div>
          {/* Section 2 */}
          <div className="py-4">
            <SubHeading>{bodyContentArticle1.section_2.subheading}</SubHeading>
            <p>{bodyContentArticle1.section_2.paragraphs.p1}</p>
          </div>
          {/* Section 3 */}
          <div className="py-4">
            <SubHeading>{bodyContentArticle1.section_3.subheading}</SubHeading>
            <ol className="list-decimal px-8">
              <li>
                <div>
                  <p className="font-bold">
                    {bodyContentArticle1.section_3.points[0].subheading}
                  </p>
                  <p>{bodyContentArticle1.section_3.points[0].description}</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="font-bold">
                    {bodyContentArticle1.section_3.points[1].subheading}
                  </p>
                  <p>{bodyContentArticle1.section_3.points[1].description}</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="font-bold">
                    {bodyContentArticle1.section_3.points[2].subheading}
                  </p>
                  <p>{bodyContentArticle1.section_3.points[2].description}</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="font-bold">
                    {bodyContentArticle1.section_3.points[3].subheading}
                  </p>
                  <p>{bodyContentArticle1.section_3.points[3].description}</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="font-bold">
                    {bodyContentArticle1.section_3.points[4].subheading}
                  </p>
                  <p>{bodyContentArticle1.section_3.points[4].description}</p>
                </div>
              </li>
            </ol>
          </div>
          {/* Section 4 */}
          <div className="py-4">
            <SubHeading>{bodyContentArticle1.section_4.subheading}</SubHeading>
            <p>{bodyContentArticle1.section_4.paragraphs.p1}</p>
          </div>
          {/* Section 5 */}
          <div className="py-4">
            <SubHeading>{bodyContentArticle1.section_5.subheading}</SubHeading>
            <p>{bodyContentArticle1.section_5.paragraphs.p1}</p>
            <Link href={bodyContentArticle1.section_5.paragraphs.href}>
              <p className="py-4 underline underline-offset-8">
                {bodyContentArticle1.section_5.paragraphs.p2}
              </p>
            </Link>
            <p>{bodyContentArticle1.section_5.paragraphs.p3}</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Investors;
