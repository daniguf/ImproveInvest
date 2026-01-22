import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GlobeSVG from "./GlobeSVG";
import { mockGlobeSVGProps } from "./GlobeSVG.mocks";

const meta = {
  component: GlobeSVG,
} satisfies Meta<typeof GlobeSVG>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockGlobeSVGProps,
};
