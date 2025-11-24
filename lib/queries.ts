import { groq } from "next-sanity";

export const allProjectsQuery = groq`
  *[_type == "project"]{
    _id,
    name,
    slug,
    image,
    url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    name,
    image,
    videoFile,
    url,
    content
  }
`;
