import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Governance from "./Governance";
import { mockGovernanceProps } from "./Governance.mocks";

const meta = {
  component: Governance,
} satisfies Meta<typeof Governance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockGovernanceProps,
};
