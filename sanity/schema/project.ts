// types/project.ts
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
  _type: "Image" | "videoFile";
  // Image-specific fields
  image?: SanityImage;
  asset?: SanityVideo;
  isFeatured?: boolean;
  // Video-specific fields
  // Common fields
  caption?: string;
  alt?: string;
}

export interface Project {
  _id: string;
  _type: "project";
  title: string;
  address: string;
  slug: {
    _type: "slug";
    current: string;
  };
  gallery: GalleryItem[];
  content: unknown[];
}

// Helper function to get featured image from gallery
export function getFeaturedImage(project: Project): GalleryItem | undefined {
  const featuredImageItem = project.gallery?.find(
    (item) => item.isFeatured === true
  );
  return featuredImageItem;
}
