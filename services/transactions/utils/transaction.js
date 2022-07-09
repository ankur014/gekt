import { apiKeys, baseTokenIds, maximumTransactionPages, maximumTransactionsPerPage } from '../../../config';
import { getTransactions } from './account';
import { getTransactionFee } from './fee';

export const fetchTransactions = async (address, network) => {
  console.log(`Fetching transactions for address: ${address} on network: ${network}`);

  let rawTransactions = [];
  try {
    for (let page = 1; page <= maximumTransactionPages; page++) {
      const response = await getTransactions(network, apiKeys[network], address, page, maximumTransactionsPerPage);
      //console.log(response);
      rawTransactions.push(...response.result);
    }
  } catch (error) {
    //console.log('error:', error);
    if (error.toString() !== 'No transactions found') {
      throw error;
    }
  }

  const domainTransactions = [];
  for (let transaction of rawTransactions) {
    //console.log(transaction);
    try {
      const fee = await getTransactionFee(baseTokenIds[network], transaction.gasPrice * transaction.gasUsed);
      domainTransactions.push({
        timestamp: transaction.timeStamp * 1000,
        hash: transaction.hash,
        // TODO: Correct fee calculation for Arbitrum, Optimism after the APIs return needed information.
        fee,
        network,
      });
    } catch (error) {
      console.log(`Exception while translating transaction on network: ${network}`, error);
    }
  }

  const response = {
    page: domainTransactions,
    size: domainTransactions.length,
  };
  console.log(`Fetched transactions for address: ${address} on network: ${network}`, domainTransactions);
  return response;
};
