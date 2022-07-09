import Axios from 'axios';

const urlBase = 'https://api.zksync.io/api/v0.2/tokens/';

export const getPrice = async (tokenId, priceIn) => {
  try {
    const denominatedInToken = priceIn || 'usd';
    console.log(`Fetching price for tokenId: ${tokenId} denominated in tokenId: ${denominatedInToken}`);

    const url = `${urlBase}${tokenId}/priceIn/${denominatedInToken}`;

    const { data } = await Axios.get(url).catch((e) => {
      throw new Error(`Request to ${e.config.url} failed with status code ${e.response.status}`);
    });

    if (data.status === 'success') {
      return data.result.price;
    } else {
      throw data.error;
    }
  } catch (error) {
    //console.log(`Exception while fetching price for token: ${tokenId}`, JSON.stringify(error));
    throw error;
  }
};
