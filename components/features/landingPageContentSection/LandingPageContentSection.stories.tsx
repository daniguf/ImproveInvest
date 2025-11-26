import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LandingPageContentSection from "./LandingPageContentSection";
import { mockLandingPageContentSectionProps } from "./LandingPageContentSection.mocks";

const meta = {
  component: LandingPageContentSection,
} satisfies Meta<typeof LandingPageContentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockLandingPageContentSectionProps,
};
