import { useEffect, useState } from 'react';

const TotalFee = ({ transactions }) => {
  const [totalFee, setTotalFee] = useState();
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    setTotalTransactions(transactions.length);
    setTotalFee(transactions.reduce((total, val) => total + val.fee, 0));
  }, [transactions]);

  if (!totalFee) {
    return <></>;
  }

  return (
    <div className="flex flex-col shadow-sm p-2 border rounded-lg justify-items-start">
      <div className="flex justify-between">
        <div className="text-sm text-gray-600">Total fees paid:</div>
        <div className="text-sm text-gray-600">{totalTransactions} Txs</div>
      </div>
      <div className="flex items-center">
        <div className="text-3xl">{totalFee.toFixed(2)}$</div>
      </div>
    </div>
  );
};

export default TotalFee;
