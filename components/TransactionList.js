import { useEffect, useRef, useState } from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions }) => {
  const listInnerRef = useRef();

  const [isAscSortOrder, setIsAscSortOrder] = useState(false);
  const [sortKey, setSortKey] = useState('timestamp');
  const [orderedTransactions, setOrderedTransactions] = useState([]);

  const shownTransactionsPageSize = 200;
  const [numberofTransactionsShown, setNumberOfTransactionsShown] = useState(shownTransactionsPageSize);

  useEffect(() => {
    //console.log(isAscSortOrder, sortKey);
    const newTransactions = transactions.sort((a, b) => {
      if (isAscSortOrder) {
        return sortKey === 'network' ? (a[sortKey] < b[sortKey] ? -1 : 1) : a[sortKey] - b[sortKey];
      } else {
        return sortKey === 'network' ? (b[sortKey] < a[sortKey] ? -1 : 1) : b[sortKey] - a[sortKey];
      }
    });
    setOrderedTransactions([...newTransactions]);
  }, [transactions, isAscSortOrder, sortKey]);

  if (orderedTransactions.length === 0) {
    return <></>;
  }

  const onSortChange = (selectedSortKey) => {
    //console.log('selectedSortKey', selectedSortKey, isAscSortOrder);
    if (selectedSortKey === sortKey) {
      setIsAscSortOrder(!isAscSortOrder);
    } else {
      setSortKey(selectedSortKey);
      setIsAscSortOrder(true);
    }
  };

  const onShowMoreClick = () => {
    setNumberOfTransactionsShown(numberofTransactionsShown + shownTransactionsPageSize);
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // console.log(`scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);
      // console.log(`scrollTop + clientHeight: ${scrollTop + clientHeight}, scrollHeight: ${scrollHeight}`);
      if (Math.floor(scrollTop + clientHeight) === Math.floor(scrollHeight)) {
        //console.log('reached bottom');
        onShowMoreClick();
      }
    }
  };

  const getSortArrow = () => {
    return isAscSortOrder ? '↑' : '↓';
  };

  return (
    <div onScroll={onScroll} ref={listInnerRef} className="bg-white rounded-md w-4/5 overflow-y-auto self-center">
      <div className="flex overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="cursor-pointer border-gray-200 bg-gray-100">
                <th
                  onClick={() => onSortChange('timestamp')}
                  className="px-5 py-3 text-left text-sm font-semibold text-gray-600 hover:text-red-400 uppercase"
                >
                  Date{sortKey === 'timestamp' ? getSortArrow() : ''}
                </th>
                <th
                  onClick={() => onSortChange('network')}
                  className="px-5 py-3 text-left text-sm font-semibold text-gray-600 hover:text-red-400 uppercase"
                >
                  Transaction{sortKey === 'network' ? getSortArrow() : ''}
                </th>
                <th
                  onClick={() => onSortChange('fee')}
                  className="px-5 py-3 text-left text-sm font-semibold text-gray-600 hover:text-red-400 uppercase"
                >
                  Fee ($){sortKey === 'fee' ? getSortArrow() : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {orderedTransactions.slice(0, numberofTransactionsShown).map((item, index) => (
                <TransactionItem key={`transaction-item-${index}`} transaction={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
