import { stringify } from 'querystring';
import { getRequest } from './request';

export const getTransactions = async (chain, apiKey, address, page, offset, startblock, endblock, sort) => {
  const apiModule = 'account';
  const action = 'txlist';

  if (!startblock) {
    startblock = 0;
  }

  if (!endblock) {
    endblock = 'latest';
  }

  if (!page) {
    page = 1;
  }

  if (!offset) {
    offset = 100;
  }

  if (!sort) {
    sort = 'asc';
  }

  var query = stringify({
    module: apiModule,
    action,
    startblock,
    endblock,
    page,
    offset,
    sort,
    address,
    apiKey,
  });

  //console.log('query:', query);

  return getRequest(chain, query);
};
