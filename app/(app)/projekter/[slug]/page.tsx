import Gallery from "@/components/features/gallery/Gallery";
import { projectBySlugQuery } from "@/lib/queries";
import { sanityClient } from "@/sanity/client";
import { Project } from "@/sanity/schema/project";
import { PortableText } from "next-sanity";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { TypedObject } from "sanity";

export async function generateStaticParams() {
  const projects = await sanityClient.fetch(
    `*[_type == "project"]{ "slug": slug.current }`
  );
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ✅ params is a Promise
}) {
  const { slug } = await params; // ✅ UNWRAP the Promise
  const store = await cookies();
  const locale = store.get("locale")?.value || "da";
  const project: Project = await sanityClient.fetch(projectBySlugQuery, {
    slug, // ✅ now pass the actual string value
    locale,
  });
  console.log("projectpage", project.content[2]);

  if (!project) notFound();

  return (
    <main className="container max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-white">{project.title}</h1>
      <Gallery items={project.gallery} />

      {project.content && (
        <div className="mt-6 lg:min-w-[1128px] text-white">
          <p className="my-4">{project.address}</p>
          <PortableText value={project.content as TypedObject[]} />
        </div>
      )}
    </main>
  );
}
