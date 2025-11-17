import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NavItem from "./NavItem";
import { mockNavItemProps } from "./NavItem.mocks";

const meta = {
  component: NavItem,
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockNavItemProps,
};
