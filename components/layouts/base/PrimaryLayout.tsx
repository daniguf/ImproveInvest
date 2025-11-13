export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout = ({ children }: IPrimaryLayout) => {
  return (
    <>
      <header className="top-0 sticky w-full p-[1em] bg-white shadow-2xl z-10">
        <nav>Nav</nav>
      </header>
      <main className="relative max-w-[1128px] mx-auto my-9 px-4 sm:px-8">
        {children}
      </main>
      <footer className="bg-secondary p-[2em] text-white">Footer</footer>
    </>
  );
};

export default PrimaryLayout;
