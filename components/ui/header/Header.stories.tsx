import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "./Header";
import { mockHeaderProps } from "./Header.mocks";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockHeaderProps,
};
