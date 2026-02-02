import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HowWeCreateValue from "./HowWeCreateValue";
import { mockHowWeCreateValueProps } from "./HowWeCreateValue.mocks";

const meta = {
  component: HowWeCreateValue,
} satisfies Meta<typeof HowWeCreateValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockHowWeCreateValueProps,
};
