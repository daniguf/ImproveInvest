// Shared document types for the `project` and `newsfeed` Sanity schemas.
export interface SanityImage {
  asset: {
    url: string;
    _id: string;
  };
}

export interface SanityVideo {
  url: string;
  _id: string;
}

export interface GalleryItem {
  _key: string;
  // NOTE: "Image" is PascalCase on purpose — it is the literal `name` of the
  // Sanity array member declared in `sanity/schema/sharedFields.ts`, and that is
  // what existing documents store as `_type`. Renaming it is a data migration.
  _type: "Image" | "videoFile";
  // Image-specific fields
  image?: SanityImage;
  asset?: SanityVideo;
  isFeatured?: boolean;
  // Common fields
  caption?: string;
  alt?: string;
}

export interface Project {
  _id: string;
  _type: "project" | "newsfeed";
  title: string;
  address?: string;
  slug: {
    _type: "slug";
    current: string;
  };
  gallery?: GalleryItem[];
  content?: unknown[];
}

// Helper function to get featured image from gallery
export function getFeaturedImage(project: Project): GalleryItem | undefined {
  const featuredImageItem = project.gallery?.find(
    (item) => item.isFeatured === true
  );
  return featuredImageItem;
}
