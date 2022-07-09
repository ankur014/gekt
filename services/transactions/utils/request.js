import { create } from 'axios';
import { networkScanUrls } from '../../../config';

export const getRequest = (chain, query, timeout) => {
  var client = create({
    baseURL: networkScanUrls[chain],
    timeout: timeout || 10000,
  });

  return new Promise(function (resolve, reject) {
    client
      .get('/api?' + query)
      .then(function (response) {
        var data = response.data;

        if (data.status && data.status != 1) {
          let returnMessage = data.message || 'NOTOK';
          if (data.result && typeof data.result === 'string') {
            returnMessage = data.result;
          } else if (data.message && typeof data.message === 'string') {
            returnMessage = data.message;
          }

          return reject(returnMessage);
        }

        if (data.error) {
          var message = data.error;

          if (typeof data.error === 'object' && data.error.message) {
            message = data.error.message;
          }

          return reject(new Error(message));
        }

        resolve(data);
      })
      .catch(function (error) {
        return reject(new Error(error));
      });
  });
};
