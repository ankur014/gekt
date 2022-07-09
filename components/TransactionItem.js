import Link from 'next/link';
import Image from 'next/image';
import { transactionUrlBases, networkIconUrls } from '../config';

const TransactionItem = ({ transaction }) => {
  const href = `${transactionUrlBases[transaction.network]}${transaction.hash}`;

  return (
    <tr className="border-x border-gray-200">
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-left">
        <p className="text-gray-900 whitespace-no-wrap">{new Date(transaction.timestamp).toLocaleString()}</p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="mr-2 mb-[-2px]">
            <Image
              width={'16px'}
              height={'16px'}
              src={networkIconUrls[transaction.network]}
              alt={`${transaction.network}`}
            />
          </div>
          <div>
            <p className="text-gray-900 whitespace-no-wrap">
              <Link href={href} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  {transaction.hash.substr(0, 12)}
                </a>
              </Link>
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-left">
        <p className="text-gray-900 whitespace-no-wrap">{transaction.fee.toFixed(2)}</p>
      </td>
    </tr>
  );
};

export default TransactionItem;
