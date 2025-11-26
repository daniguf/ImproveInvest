/* eslint-disable @typescript-eslint/no-explicit-any */
import { projectBySlugQuery } from "@/lib/queries";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

type Project = {
  _id: string;
  name: string;
  image?: { asset: { _id: string }; alt?: string };
  videoUrl?: string;
  url?: string;
  content?: any;
};

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

  const project: Project = await sanityClient.fetch(projectBySlugQuery, {
    slug, // ✅ now pass the actual string value
  });

  if (!project) notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{project.name}</h1>

      {project.image?.asset && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
          <Image
            src={urlFor(project.image)
              .width(1200)
              .height(675)
              .quality(90)
              .url()}
            alt={project.image.alt || project.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {project.videoUrl && (
        <video controls className="w-full rounded-xl mb-6">
          <source src={project.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-block mb-6 text-blue-600 hover:underline"
        >
          Visit project →
        </a>
      )}

      {project.content && (
        <div className="prose prose-invert max-w-none">
          <PortableText value={project.content} />
        </div>
      )}
    </main>
  );
}
