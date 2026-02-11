import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import WhyInvest from "./WhyInvest";
import { mockWhyInvestProps } from "./WhyInvest.mocks";

const meta = {
  component: WhyInvest,
} satisfies Meta<typeof WhyInvest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockWhyInvestProps,
};
