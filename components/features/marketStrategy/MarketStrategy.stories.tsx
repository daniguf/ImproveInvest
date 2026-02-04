import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MarketStrategy from "./MarketStrategy";
import { mockMarketStrategyProps } from "./MarketStrategy.mocks";

const meta = {
  component: MarketStrategy,
} satisfies Meta<typeof MarketStrategy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockMarketStrategyProps,
};
