import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LanguageSwitcher from "./LanguageSwitcher";

const meta = {
  component: LanguageSwitcher,
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
