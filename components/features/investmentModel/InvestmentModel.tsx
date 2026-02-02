export interface IInvestmentModel {
  sampleTextProp: string;
}

const InvestmentModel: React.FC<IInvestmentModel> = ({ sampleTextProp }) => {
  return <div className="">{sampleTextProp} </div>;
};

export default InvestmentModel;
