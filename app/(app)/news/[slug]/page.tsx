import Gallery from "@/components/features/gallery/Gallery";
import { newsfeedItemBySlugQuery } from "@/lib/queries";
import { sanityClient } from "@/sanity/client";
import { Project } from "@/sanity/schema/project";
import { PortableText } from "next-sanity";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { TypedObject } from "sanity";

export async function generateStaticParams() {
  const projects = await sanityClient.fetch(
    `*[_type == "newsfeed"]{ "slug": slug.current }`
  );
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ✅ params is a Promise
}) {
  const { slug } = await params; // ✅ UNWRAP the Promise
  const store = await cookies();
  const locale = store.get("locale")?.value || "da";
  const project: Project = await sanityClient.fetch(newsfeedItemBySlugQuery, {
    slug, // ✅ now pass the actual string value
    locale,
  });

  if (!project) notFound();

  return (
    <main className="container max-w-5xl mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-white">{project.title}</h1>
      {project.gallery && <Gallery items={project.gallery} />}

      {project.content && (
        <div className="mt-6 lg:min-w-[1128px] text-white">
          <p className="my-4">{project.address}</p>
          <PortableText value={project.content as TypedObject[]} />
        </div>
      )}
    </main>
  );
}
