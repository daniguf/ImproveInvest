import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BuildingsWithIdententyAndPotential from "./BuildingsWithIdententyAndPotential";
import { mockBuildingsWithIdententyAndPotentialProps } from "./BuildingsWithIdententyAndPotential.mocks";

const meta = {
  component: BuildingsWithIdententyAndPotential,
} satisfies Meta<typeof BuildingsWithIdententyAndPotential>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: mockBuildingsWithIdententyAndPotentialProps,
};
