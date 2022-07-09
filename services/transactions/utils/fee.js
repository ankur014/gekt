import { getPrice } from '../../prices';
import { zksyncTokens } from '../../../config';

const tokenPrices = {};

export const getTransactionFee = async (tokenId, tokenAmount) => {
  //console.log(tokenId, tokenAmount);
  const tokenDecimals = zksyncTokens[tokenId].decimals;
  const tokenPriceInUsd = tokenPrices[tokenId] || (await getPrice(tokenId));
  tokenPrices[tokenId] = tokenPriceInUsd;

  const fee = (tokenAmount / 10 ** tokenDecimals) * tokenPriceInUsd;
  return fee;
};
