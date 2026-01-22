import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PointedArrowSVG from "./PointedArrowSVG";
import { mockPointedArrowSVGProps } from "./PointedArrowSVG.mocks";

const meta = {
  component: PointedArrowSVG,
} satisfies Meta<typeof PointedArrowSVG>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockPointedArrowSVGProps,
};
