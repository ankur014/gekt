import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import SearchBar from '../components/SearchBar';
import StatsBar from '../components/StatsBar';
import TransactionList from '../components/TransactionList';
import { networksSupported } from '../config';

export default function Home() {
  const addressesCookieName = 'gekt-addresses';
  const [cookies, setCookie] = useCookies([addressesCookieName]);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    setSearchBarValue(cookies[addressesCookieName] || '');
  }, [cookies]);

  const onSearchBarValueChange = (event) => {
    setSearchBarValue(event.target.value);
  };

  const onFetchClick = async () => {
    setIsErrored(false);
    setIsLoading(true);
    setTransactions([]);
    const address = searchBarValue.split(/\s+/)[0];
    setCookie(addressesCookieName, address);
    const isMini = false;

    const networks = isMini ? { Polygon: 'Polygon' } : networksSupported;
    const newTransactions = [];
    for (let networkId of Object.keys(networks)) {
      await populateTransactions(address, networkId, newTransactions);
    }

    setIsLoading(false);
  };

  const populateTransactions = async (address, networkId, newTransactions, from) => {
    const response = await fetch(
      `/api/transactions?address=${address}&network=${networksSupported[networkId]}${
        from !== undefined ? `&from=${from}` : ''
      }`,
      {
        cache: 'no-store',
      }
    );
    if (response.status === 200) {
      const transactionsPage = await response.json();
      console.log('transactionsPage:', transactionsPage);
      newTransactions.push(...transactionsPage.page);
      //console.log('newTransactions', newTransactions);
      setTransactions([...newTransactions]);

      if (transactionsPage.from) {
        await populateTransactions(address, networkId, newTransactions, transactionsPage.from);
      }
    } else {
      if (!isErrored) {
        setIsErrored(true);
      }
    }
  };

  return (
    <div className="flex flex-col text-center h-full">
      <SearchBar
        searchBarValue={searchBarValue}
        onSearchBarValueChange={onSearchBarValueChange}
        onFetchClick={onFetchClick}
        isErrored={isErrored}
        isLoading={isLoading}
      />
      <StatsBar transactions={transactions} />
      <TransactionList transactions={transactions} />
    </div>
  );
}
