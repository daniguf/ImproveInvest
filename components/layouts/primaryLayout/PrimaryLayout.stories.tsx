import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PrimaryLayout from "./PrimaryLayout";
import { mockPrimaryLayoutProps } from "./PrimaryLayout.mocks";

const meta = {
  component: PrimaryLayout,
} satisfies Meta<typeof PrimaryLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockPrimaryLayoutProps,
};
