"use client";

import MaxWidthWrapper from "@/components/layouts/maxWidthWrapper/MaxWidthWrapper";
import Heading from "@/components/ui/heading/Heading";
import SubHeading from "@/components/ui/subHeading/SubHeading";
import { useMessages } from "next-intl";
import Image from "next/image";

const Mira = ({ locale }: { locale: string }) => {
  const messages = useMessages();
  const bodyContentHeading = messages.mira.title;
  const bodyContentArticle1 = messages.mira.articles.article_1;
  const bodyContentArticle2 = messages.mira.articles.article_2;
  const bodyContentArticle2Heading = bodyContentArticle2.heading;

  return (
    <>
      <section className="h-full w-full">
        <MaxWidthWrapper>
          {/* Article 1 */}
          <div className="h-full w-full text-white">
            <div className="w-full mb-8">
              <Heading>{bodyContentHeading}</Heading>
            </div>
            {/* Section 1 */}
            <div className="pt-24 px-64 pb-32 border-x mb-8">
              <p className="font-bold">
                {bodyContentArticle1.section_1.subheading}
              </p>
              <p className="my-12 text-3xl">
                {bodyContentArticle1.section_1.paragraphs.p1}
              </p>
              <p className="mb-2 mt-4">
                {bodyContentArticle1.section_1.paragraphs.p2}
              </p>
            </div>
            {/* Section 2 */}
            <div className="py-2 mb-32 border-x px-8">
              <div className="flex-2">
                <SubHeading>
                  {bodyContentArticle1.section_2.subheading}
                </SubHeading>
                <p className="mt-4 mb-4">
                  {bodyContentArticle1.section_2.paragraphs.p1}
                </p>
              </div>
              <div className="flex-3">
                <p className="py-4">
                  {bodyContentArticle1.section_2.paragraphs.p2.subheading}
                </p>
                <ul className="grid grid-cols-3 gap-4">
                  <li className="border-b-2 border-gray-200 p-8 font-bold">
                    {bodyContentArticle1.section_2.paragraphs.p2.points[0]}
                  </li>
                  <li className="border-b-2 border-gray-200 p-8 font-bold">
                    {bodyContentArticle1.section_2.paragraphs.p2.points[1]}
                  </li>
                  <li className="border-b-2 border-gray-200 p-8 font-bold">
                    {bodyContentArticle1.section_2.paragraphs.p2.points[2]}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col px-48 py-32 gap-24 bg-primary">
              {/* Section 3 */}
              <div className="px-8">
                <SubHeading>
                  {bodyContentArticle1.section_3.subheading}
                </SubHeading>
                <p>{bodyContentArticle1.section_3.paragraphs.p1}</p>
                <p>{bodyContentArticle1.section_3.paragraphs.p2}</p>
              </div>
              {/* Section 4 */}
              <div className="px-8">
                <SubHeading>
                  {bodyContentArticle1.section_4.subheading}
                </SubHeading>
                <p>{bodyContentArticle1.section_4.paragraphs.p1}</p>
                <p>{bodyContentArticle1.section_4.paragraphs.p2}</p>
              </div>
              {/* Section 5 */}
              <div className="px-8">
                <SubHeading>
                  {bodyContentArticle1.section_5.subheading}
                </SubHeading>
                <p>{bodyContentArticle1.section_5.paragraphs.p1}</p>
              </div>
              {/* Section 6 */}
              <div className="px-8">
                <SubHeading>
                  {bodyContentArticle1.section_6.subheading}
                </SubHeading>
                <p>{bodyContentArticle1.section_6.paragraphs.p1}</p>
              </div>
            </div>
            {/* Section 7 */}
            <div className="py-12 border-x px-8 mt-4">
              <div className="py-8">
                <SubHeading>
                  {bodyContentArticle1.section_7.subheading}
                </SubHeading>
              </div>
              <ul className="grid grid-cols-3 grid-rows-2 gap-2">
                <li className="bg-primary/50 border p-4 content-center">
                  {bodyContentArticle1.section_7.paragraphs.p1.points[0]}
                </li>
                <li className="bg-primary/65 border p-4 content-center">
                  {bodyContentArticle1.section_7.paragraphs.p1.points[1]}
                </li>
                <li className="bg-primary/70 border p-4 content-center">
                  {bodyContentArticle1.section_7.paragraphs.p1.points[2]}
                </li>
                <li className="bg-primary/85 border p-4 content-center">
                  {bodyContentArticle1.section_7.paragraphs.p1.points[3]}
                </li>
                <li className="bg-primary border p-4 content-center">
                  {bodyContentArticle1.section_7.paragraphs.p1.points[4]}
                </li>
              </ul>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="bg-primary/85 w-full h-24"></div>
        <MaxWidthWrapper>
          {/* Article 2 */}
          <div className="h-full w-full text-white px-8">
            <div className="w-full mb-8">
              <Heading>{bodyContentArticle2Heading}</Heading>
            </div>
            {/* Section 1 */}
            <div className="py-2 w-full">
              <SubHeading>
                {bodyContentArticle2.section_1.subheading}
              </SubHeading>
              <p>{bodyContentArticle2.section_1.paragraphs.p1}</p>
              <p>{bodyContentArticle2.section_1.paragraphs.p2}</p>
              <div className="w-full flex justify-center items-center p-4 py-16">
                <Image
                  src={`/mira/MIRA_${locale}.png`}
                  alt="mira"
                  quality={100}
                  width={700}
                  height={100}
                />
              </div>
              <p>{bodyContentArticle2.section_1.paragraphs.p3}</p>
            </div>
            {/* Section 2 */}
            <div className="py-2">
              <SubHeading>
                {bodyContentArticle2.section_2.subheading}
              </SubHeading>
              <p>{bodyContentArticle2.section_2.paragraphs.p1}</p>
              <div>
                <p className="py-2">
                  {bodyContentArticle2.section_2.paragraphs.p2.subheading}
                </p>
                <ul className="list-disc list-inside px-8">
                  <li>
                    {bodyContentArticle2.section_2.paragraphs.p2.points[0]}
                  </li>
                  <li>
                    {bodyContentArticle2.section_2.paragraphs.p2.points[1]}
                  </li>
                  <li>
                    {bodyContentArticle2.section_2.paragraphs.p2.points[2]}
                  </li>
                </ul>
              </div>
            </div>
            {/* Section 3 */}
            <div className="pb-8 pt-16 border-x px-8 mt-8">
              <SubHeading>
                {bodyContentArticle2.section_3.subheading}
              </SubHeading>
              <p>{bodyContentArticle2.section_3.paragraphs.p1}</p>
            </div>
            <div className="grid grid-cols-12 grid-rows-3 gap-8 py-16 border-x px-8">
              {/* Section 4 */}
              <div className="relative col-span-6 bg-primary/35 p-8 after:h-1/5 after:bg-amber-300 after:w-1 after:absolute after:right-0 after:animate-bounce">
                <SubHeading>
                  {bodyContentArticle2.section_4.subheading}
                </SubHeading>
                <p className="py-8">
                  {bodyContentArticle2.section_4.paragraphs.p1}
                </p>
                <div>
                  <p>
                    {bodyContentArticle2.section_4.paragraphs.p2.subheading}
                  </p>
                  <ul className="list-disc list-inside px-8 py-4">
                    <li>
                      {bodyContentArticle2.section_4.paragraphs.p2.points[0]}
                    </li>
                    <li>
                      {bodyContentArticle2.section_4.paragraphs.p2.points[1]}
                    </li>
                    <li>
                      {bodyContentArticle2.section_4.paragraphs.p2.points[2]}
                    </li>
                    <li>
                      {bodyContentArticle2.section_4.paragraphs.p2.points[3]}
                    </li>
                  </ul>
                </div>
                <p>{bodyContentArticle2.section_4.paragraphs.p3}</p>
              </div>
              {/* Section 5 */}
              <div className="relative col-span-6 row-start-2 col-start-4 bg-primary/35 p-8 after:h-1/3 after:bg-amber-300 after:w-1 after:absolute after:right-0 after:animate-bounce">
                <SubHeading>
                  {bodyContentArticle2.section_5.subheading}
                </SubHeading>
                <p className="py-8">
                  {bodyContentArticle2.section_5.paragraphs.p1}
                </p>
                <div>
                  <p>
                    {bodyContentArticle2.section_5.paragraphs.p2.subheading}
                  </p>
                  <ul className="list-disc list-inside px-8 py-4">
                    <li>
                      {bodyContentArticle2.section_5.paragraphs.p2.points[0]}
                    </li>
                    <li>
                      {bodyContentArticle2.section_5.paragraphs.p2.points[1]}
                    </li>
                    <li>
                      {bodyContentArticle2.section_5.paragraphs.p2.points[2]}
                    </li>
                  </ul>
                </div>
                <p>{bodyContentArticle2.section_5.paragraphs.p3}</p>
              </div>
              {/* Section 6 */}
              <div className="col-span-6 row-start-3 col-start-6 bg-primary/35 p-8">
                <SubHeading>
                  {bodyContentArticle2.section_6.subheading}
                </SubHeading>
                <p className="py-8">
                  {bodyContentArticle2.section_6.paragraphs.p1}
                </p>
                <div>
                  <p>
                    {bodyContentArticle2.section_6.paragraphs.p2.subheading}
                  </p>
                  <ul className="list-disc list-inside px-8 py-4">
                    <li>
                      {bodyContentArticle2.section_6.paragraphs.p2.points[0]}
                    </li>
                    <li>
                      {bodyContentArticle2.section_6.paragraphs.p2.points[1]}
                    </li>
                    <li>
                      {bodyContentArticle2.section_6.paragraphs.p2.points[2]}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Section 7 */}
            <div className="py-8 flex flex-col gap-10">
              <SubHeading>
                {bodyContentArticle2.section_7.subheading}
              </SubHeading>
              <p className="text-2xl font-bold mb-4">{bodyContentArticle2.section_7.paragraphs.p1}</p>
              <p className="text-2xl font-bold">{bodyContentArticle2.section_7.paragraphs.p2}</p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Mira;
