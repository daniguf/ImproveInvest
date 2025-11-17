import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NavItems from "./NavItems";
import { mockNavItemsProps } from "./NavItems.mocks";

const meta = {
  component: NavItems,
} satisfies Meta<typeof NavItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockNavItemsProps,
};
