import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InvestmentModel from "./InvestmentModel";

const meta = {
  component: InvestmentModel,
} satisfies Meta<typeof InvestmentModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
