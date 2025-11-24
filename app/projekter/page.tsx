import { allProjectsQuery } from "@/lib/queries"; // create this file as shown earlier
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";

type Project = {
  _id: string;
  name: string;
  slug: { current: string };
  image?: { asset: { _id: string }; alt?: string };
  url?: string;
};

export default async function ProjectsPage() {
  const projects: Project[] = await sanityClient.fetch(allProjectsQuery);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-primary">Projects</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p._id}
            href={`/projekter/${p.slug.current}`}
            className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            {p.image?.asset && (
              <div className="aspect-video relative">
                <Image
                  src={urlFor(p.image).width(800).height(450).quality(90).url()}
                  alt={p.image.alt || p.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold group-hover:underline text-secondary">
                {p.name}
              </h2>
              {p.url && <p className="text-sm text-gray-500 mt-1">{p.url}</p>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
