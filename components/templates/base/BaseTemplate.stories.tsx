import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BaseTemplate from "./BaseTemplate";
import { mockBaseTemplateProps } from "./BaseTemplate.mocks";

const meta = {
  component: BaseTemplate,
} satisfies Meta<typeof BaseTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockBaseTemplateProps,
};
