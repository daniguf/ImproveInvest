import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MobileNav from "./MobileNav";
import { mockMobileNavProps } from "./MobileNav.mocks";

const meta = {
  component: MobileNav,
} satisfies Meta<typeof MobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockMobileNavProps,
};
