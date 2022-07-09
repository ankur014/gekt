import { getPrice } from '../../services/prices';

const handler = async (req, res) => {
  try {
    const price = await getPrice(req.query.id, req.query.priceIn);
    res.status(200).json({ price });
  } catch (error) {
    res.status(500).json({});
  }
};

export default handler;
