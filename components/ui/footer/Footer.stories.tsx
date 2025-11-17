import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from "./Footer";
import { mockFooterProps } from "./Footer.mocks";

const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockFooterProps,
};
