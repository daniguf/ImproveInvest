import { IProjectShowcaseCarousel } from "./ProjectShowcaseCarousel";

const mockProjects = [
  {
    _id: "1",
    title: "Harbor View Residences",
    address: "123 Coastal Drive, Miami, FL",
    image: {
      asset: {
        _ref: "image-1",
        url: "https://picsum.photos/300/200",
      },
    },
    slug: { current: "harbor-view-residences" },
  },
  {
    _id: "2",
    title: "Downtown Commercial Plaza",
    address: "456 Business Ave, New York, NY",
    image: {
      asset: {
        _ref: "image-2",
        url: "https://picsum.photos/900/600",
      },
    },
    slug: { current: "downtown-commercial-plaza" },
  },
];

const base: IProjectShowcaseCarousel = {
  projects: mockProjects,
};

const alt: IProjectShowcaseCarousel = {
  projects: [mockProjects[0]],
};

export const mockProjectShowcaseCarouselProps = { base, alt };
