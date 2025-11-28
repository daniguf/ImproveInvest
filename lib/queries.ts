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
    "videoUrl": videoFile.asset->url, // This line is updated
    url,
    content
  }
`;
