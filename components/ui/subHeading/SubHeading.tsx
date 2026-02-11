interface ISubHeading {
  children?: React.ReactNode;
}

const SubHeading = ({ children }: ISubHeading) => {
  return <h1 className="text-lg font-bold text-white">{children}</h1>;
};

export default SubHeading;
