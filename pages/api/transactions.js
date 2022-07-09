import { getTransactions } from '../../services/transactions';
import { networksSupported } from '../../config';

// TODO: Maybe - filter out transactions which were sent to the address itself.
const handler = async (req, res) => {
  const address = req.query.address;
  const network = req.query.network;
  const from = req.query.from;

  if (!address || !network || Object.keys(networksSupported).indexOf(network) === -1) {
    res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const response = await getTransactions(address, network, from);
    res.status(200).json(response);
  } catch (error) {
    console.log(`Exception while fetching transactions for address: ${address} on network: ${network}`, error);
    const errorString = JSON.stringify(error);
    if (errorString.indexOf('Invalid address') !== -1) {
      res.status(400).json({ message: 'Invalid input' });
    } else {
      res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
  }
};

export default handler;
