import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ContactForm from "./ContactForm";

const meta = {
  component: ContactForm,
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
