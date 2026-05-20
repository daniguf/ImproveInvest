// lib/queries.ts
import { groq } from "next-sanity";

// Query to get all projects
export const allProjectsQuery = groq`*[_type == "project"] | order(title asc) {
  _id,
  _type,
  "title": coalesce(title[$locale], title.da, "No title"),
  address,
  slug,
  gallery[] {
    _type == "Image" => {
      _type,
      image,
      caption,
      isFeatured
    },
    _type == "videoFile" => {
      _type,
      videoFile
    }
  },
  "content": coalesce(
    content[_key == $locale],
    content[_key == "da"],
    []
  )
}`;

// Query to get a single project by slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  "title": coalesce(title[$locale], title.da, "No title"),
  address,
  slug,
  gallery[] {
    _key,
    _type,
    // For Image objects
    _type == "Image" => {
      image {
        asset->{
          _id,
          url
        },
        caption,
        hotspot,
        crop
      },
      caption,
      isFeatured
    },
    // For video objects
    _type == "videoFile" => {
        asset->{
        _id,
        url
      }
    }
  },
  "content": coalesce(
    content[_key == $locale][0].value,
    content[_key == "da"][0].value,
    []
  )
}`;

// Query to get all newsfeed items
export const allNewsfeedItemsQuery = groq`*[_type == "newsfeed"] | order(title asc) {
  _id,
  _type,
  "title": coalesce(title[$locale], title.da, "No title"),
  slug,
  gallery[] {
    _type == "Image" => {
      _type,
      image,
      caption,
      isFeatured
    },
    _type == "videoFile" => {
      _type,
      videoFile
    }
  },
  "content": coalesce(
    content[_key == $locale],
    content[_key == "da"],
    []
  )
}`;

// Query to get a single newsfeed item by slug
export const newsfeedItemBySlugQuery = groq`*[_type == "newsfeed" && slug.current == $slug][0] {
  _id,
  "title": coalesce(title[$locale], title.da, "No title"),
  slug,
  gallery[] {
    _key,
    _type,
    _type == "Image" => {
      image {
        asset->{
          _id,
          url
        },
        caption,
        hotspot,
        crop
      },
      caption,
      isFeatured
    },
    _type == "videoFile" => {
        asset->{
        _id,
        url
      }
    }
  },
  "content": coalesce(
    content[_key == $locale][0].value,
    content[_key == "da"][0].value,
    []
  )
}`;
