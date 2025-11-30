import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectShowcaseCarousel from "./ProjectShowcaseCarousel";
import { mockProjectShowcaseCarouselProps } from "./ProjectShowcaseCarousel.mocks";

const meta: Meta<typeof ProjectShowcaseCarousel> = {
  component: ProjectShowcaseCarousel,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ProjectShowcaseCarousel>;

export const Default: Story = {
  args: mockProjectShowcaseCarouselProps.base,
};

export const SingleProject: Story = {
  args: mockProjectShowcaseCarouselProps.alt,
};
