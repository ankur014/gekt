import Link from 'next/link';
import Image from 'next/image';
import { transactionUrlBases, networkIconUrls } from '../config';
import { useEffect, useState } from 'react';

const CostliestTransaction = ({ transactions }) => {
  const [costliestTransaction, setCostliestTransaction] = useState();

  useEffect(() => {
    const result = getCostliestTransaction(transactions);
    setCostliestTransaction(result);
  }, [transactions]);

  if (!costliestTransaction) {
    return <></>;
  }

  return (
    <div className="flex flex-col shadow-sm p-2 border rounded-lg justify-items-start">
      <div className="flex justify-between">
        <div className="text-sm text-gray-600">Costliest tansaction:</div>
        <div className="text-sm text-gray-600">{costliestTransaction.fee.toFixed(2)}$</div>
      </div>
      <div className="flex items-center">
        <Link href={`${transactionUrlBases[costliestTransaction.network]}${costliestTransaction.hash}`} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <div className="text-3xl">{costliestTransaction.hash.substr(0, 8)}</div>
          </a>
        </Link>
        <div className="ml-2 mb-[-2px]">
          <Image
            width={'24px'}
            height={'24px'}
            src={networkIconUrls[costliestTransaction.network]}
            alt={costliestTransaction.network}
          />
        </div>
      </div>
    </div>
  );
};

const getCostliestTransaction = (transactions) => {
  let maxFee = Number.NEGATIVE_INFINITY;
  let result;

  for (let transaction of transactions) {
    if (transaction.fee > maxFee) {
      maxFee = transaction.fee;
      result = transaction;
    }
  }

  return result;
};

export default CostliestTransaction;
