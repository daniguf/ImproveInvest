import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MarketingLayout from "./MarketingLayout";
import { mockMarketingLayoutProps } from "./MarketingLayout.mocks";

const meta = {
  component: MarketingLayout,
} satisfies Meta<typeof MarketingLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockMarketingLayoutProps,
};
