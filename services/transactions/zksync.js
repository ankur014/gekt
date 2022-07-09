import Axios from 'axios';
import { networksSupported, networkScanUrls } from '../../config';
import { getTransactionFee } from './utils/fee';

const pageSize = 100;
const maxPagesToFetch = 3;

export const fetchTransactions = async (address, fromOverride) => {
  console.log(`Fetching transactions for address: ${address} on ${networksSupported.ZKSync}`);

  let from = fromOverride || 'latest';
  let rawTransactions = [];
  let isMoreFetchingNeeded = true;
  let pagesFetched = 0;
  do {
    const url = `${
      networkScanUrls[networksSupported.ZKSync]
    }/accounts/${address}/transactions?from=${from}&limit=${pageSize}&direction=older`;

    const { data } = await Axios.get(url).catch((e) => {
      throw new Error(`Request to ${e.config.url} failed with status code ${e.response.status}`);
    });

    if (data.status === 'success') {
      if (data.result.list.length === 0) {
        from = undefined;
        isMoreFetchingNeeded = false;
      } else if (data.result.list.length === 1) {
        from = undefined;
        isMoreFetchingNeeded = false;
        if (from === 'latest') {
          rawTransactions.push(...data.result.list);
        }
      } else {
        let transactionList = data.result.list;
        rawTransactions.push(...transactionList);
        from = transactionList[transactionList.length - 1].txHash;
      }
    } else {
      throw data.error;
    }

    pagesFetched++;
    if (pagesFetched === maxPagesToFetch) isMoreFetchingNeeded = false;
  } while (isMoreFetchingNeeded);

  const domainTransactions = [];
  for (let transaction of rawTransactions) {
    console.log(transaction);
    // Ignore this type since they are covered on L1
    if (transaction.op.type === 'Deposit') {
      continue;
    }

    try {
      let tokenId;
      let tokenAmount;

      if (transaction.op.type !== 'Transfer') {
        tokenId = transaction.op.feeToken;
        tokenAmount = transaction.op.fee;
      } else {
        tokenId = transaction.op.token;
        tokenAmount = transaction.op.fee;
      }

      const fee = await getTransactionFee(tokenId, tokenAmount);
      domainTransactions.push({
        timestamp: new Date(transaction.createdAt).getTime(),
        hash: transaction.txHash,
        fee,
        network: networksSupported.ZKSync,
      });
    } catch (error) {
      console.log(`Exception while translating transaction on ${networksSupported.ZKSync}`, error);
    }
  }

  const response = {
    page: domainTransactions,
    size: domainTransactions.length,
    from,
  };
  console.log(`Fetched transactions for address: ${address} on ${networksSupported.ZKSync}`, domainTransactions);
  return response;
};
