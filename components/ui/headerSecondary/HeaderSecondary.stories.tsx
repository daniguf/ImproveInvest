import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeaderSecondary from "./HeaderSecondary";
import { mockHeaderSecondaryProps } from "./HeaderSecondary.mocks";

const meta = {
  component: HeaderSecondary,
} satisfies Meta<typeof HeaderSecondary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockHeaderSecondaryProps,
};
