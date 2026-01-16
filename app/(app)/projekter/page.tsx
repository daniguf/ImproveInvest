import { allProjectsQuery } from "@/lib/queries"; // create this file as shown earlier
import { sanityFetch } from "@/lib/sanity-utils";
import { urlFor } from "@/sanity/image";
import { getFeaturedImage, Project } from "@/sanity/schema/project";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const store = await cookies();
  const locale = store.get("locale")?.value || "da";
  const projects: Project[] = await sanityFetch({
    query: allProjectsQuery,
    params: { locale },
  });

  // const projects: Project[] = await sanityClient.fetch(allProjectsQuery);

  return (
    <section className="px-6 py-12 min-w-[90dvw] xl:min-w-[1128px]">
      <h1 className="text-3xl font-bold mb-8 text-primary">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projekter/${project.slug.current}`}
            className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            {getFeaturedImage(project)?.image?.asset && (
              <div className="aspect-video relative">
                <Image
                  src={urlFor(getFeaturedImage(project)?.image).url() || ""}
                  alt={getFeaturedImage(project)?.alt || project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold group-hover:underline text-secondary">
                {project.title}
              </h2>
              {project.address && (
                <p className="text-sm text-gray-500 mt-1">
                  {project.address || ""}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
