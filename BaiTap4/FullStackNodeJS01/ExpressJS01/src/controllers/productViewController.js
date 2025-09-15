// controllers/productViewController.js
import { addViewHistory, getViewHistory } from '../services/productViewService.js';

export const addViewHistoryCtrl = async (req, res) => {
  await addViewHistory(req.user.id, req.params.productId);
  res.json({ message: 'Đã ghi nhận lượt xem sản phẩm' });
};

export const getViewHistoryCtrl = async (req, res) => {
  const history = await getViewHistory(req.user.id);
  res.json(history);
};
