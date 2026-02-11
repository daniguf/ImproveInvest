import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ImproveInvestLogoSVG from "./ImproveInvestLogo";
import { mockImproveInvestLogoSVGProps } from "./ImproveInvestLogo.mocks";

const meta = {
  component: ImproveInvestLogoSVG,
} satisfies Meta<typeof ImproveInvestLogoSVG>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockImproveInvestLogoSVGProps,
};
