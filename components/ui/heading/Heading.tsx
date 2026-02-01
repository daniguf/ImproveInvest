interface IHeading {
  children?: React.ReactNode;
}

const Heading = ({ children }: IHeading) => {
  return <h1 className="text-4xl font-medium text-white">{children}</h1>;
};

export default Heading;
