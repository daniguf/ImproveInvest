import { IPrimaryLayout } from "./PrimaryLayout";

// Deliberately generic content: pulling the real home page in here dragged the
// Sanity client (and its required environment variables) into Storybook.
const base: IPrimaryLayout = {
  children: <p>Page content</p>,
};

export const mockPrimaryLayoutProps = base;
