interface IHeading {
  children?: React.ReactNode;
}

const Heading = ({ children }: IHeading) => {
  return <h1 className="text-4xl font-bold text-white max-sm:wrap-break-word max-sm:text-3xl">{children}</h1>;
};

export default Heading;
