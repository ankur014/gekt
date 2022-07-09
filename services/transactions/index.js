import { networksSupported } from '../../config';
import { fetchTransactions } from './utils/transaction';
import { fetchTransactions as fetchZKSyncTransactions } from './zksync';

export const getTransactions = async (address, network, from) => {
  if (network === networksSupported.ZKSync) {
    return await fetchZKSyncTransactions(address, from);
  } else {
    return await fetchTransactions(address, network);
  }
};
