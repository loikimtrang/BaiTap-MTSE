// controllers/productStatController.js
import { countCommentersOfProduct } from '../services/statService.js';

export const productCommentersCountCtrl = async (req, res) => {
  const count = await countCommentersOfProduct(req.params.productId);
  res.json({
    productId: req.params.productId,
    commenterCount: count,
  });
};
