import { useEffect, useState } from 'react';
import Image from 'next/image';
import { networksSupported, networkIconUrls } from '../config';

const BusiestNetwork = ({ transactions }) => {
  const [busiestNetwork, setBusiestNetwork] = useState();
  const [maxHits, setMaxHits] = useState(0);

  useEffect(() => {
    let newMaxHits = Number.NEGATIVE_INFINITY;
    let newBusiestNetwork;
    const initialNetworkHits = {};
    Object.keys(networksSupported).forEach((network) => (initialNetworkHits[network] = 0));

    transactions.forEach((transaction) => {
      initialNetworkHits[transaction.network] += 1;
      if (newMaxHits < initialNetworkHits[transaction.network]) {
        newMaxHits = initialNetworkHits[transaction.network];
        newBusiestNetwork = transaction.network;
      }
    });

    setBusiestNetwork(newBusiestNetwork);
    setMaxHits(newMaxHits);
  }, [transactions]);

  if (!busiestNetwork) {
    return <></>;
  }

  return (
    <div className="flex flex-col shadow-sm p-2 border rounded-lg justify-items-start">
      <div className="flex justify-between">
        <div className="text-sm text-gray-600">Most used network:</div>
        <div className="text-sm text-gray-600">{maxHits} Txs</div>
      </div>
      <div className="flex items-center">
        <div className="text-3xl">{busiestNetwork}</div>
        <div className="ml-2 mb-[-2px]">
          <Image width={'24px'} height={'24px'} src={networkIconUrls[busiestNetwork]} alt={busiestNetwork} />
        </div>
      </div>
    </div>
  );
};

export default BusiestNetwork;
