import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectsCarousel from "./ProjectsCarousel";
import { mockProjectsCarouselProps } from "./ProjectsCarousel.mocks";

const meta = {
  component: ProjectsCarousel,
} satisfies Meta<typeof ProjectsCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockProjectsCarouselProps,
};
