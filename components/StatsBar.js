import BusiestNetwork from './BusiestNetwork';
import CostliestTransaction from './CostliestTransaction';
import TotalFee from './TotalFee';

const StatsBar = ({ transactions }) => {
  if (transactions.length === 0) {
    return <></>;
  }

  return (
    <div className="gap-12 grid my-4 md:grid-cols-3 sm:grid-cols-1 w-4/5 self-center">
      <TotalFee transactions={transactions} />
      <BusiestNetwork transactions={transactions} />
      <CostliestTransaction transactions={transactions} />
    </div>
  );
};

export default StatsBar;
