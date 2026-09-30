import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Governance from "./Governance";

const meta = {
  component: Governance,
} satisfies Meta<typeof Governance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
