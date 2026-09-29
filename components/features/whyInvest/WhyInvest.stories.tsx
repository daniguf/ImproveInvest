import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import WhyInvest from "./WhyInvest";

const meta = {
  component: WhyInvest,
} satisfies Meta<typeof WhyInvest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
