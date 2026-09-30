import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MobileNav from "./MobileNav";

const meta = {
  component: MobileNav,
} satisfies Meta<typeof MobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
