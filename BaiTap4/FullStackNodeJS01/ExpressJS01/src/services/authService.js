import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import { sendResetEmail } from './mailService.js';
const { User, PasswordReset } = db;

export const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { EC: 1, EM: 'Email/Password không hợp lệ' };
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return { EC: 1, EM: 'Email/Password không hợp lệ' };

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
  return { EC: 0, DT: { token, user: { id: user.id, name: user.name, email: user.email } } };
};

export const getAccount = async (id) => {
  const user = await User.findByPk(id, { attributes: ['id','name','email','role'] });
  return user;
};

// Forgot Password
import crypto from 'crypto';

export const requestReset = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { EC: 1, EM: 'Email không tồn tại' };

  const token = crypto.randomBytes(32).toString('hex');
  const ttl = new Date(Date.now() + 15 * 60 * 1000); // 15 phút
  await PasswordReset.create({ userId: user.id, token, expiresAt: ttl });

  await sendResetEmail(email, token); // gửi mail ở đây

  return { EC: 0, EM: 'Vui lòng kiểm tra email để đặt lại mật khẩu' };
};

export const resetPassword = async (token, newPassword) => {
  const pr = await PasswordReset.findOne({ where: { token } });
  if (!pr || pr.expiresAt < new Date()) return { EC: 1, EM: 'Token không hợp lệ/đã hết hạn' };

  const user = await User.findByPk(pr.userId);
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  await pr.destroy();
  return { EC: 0, EM: 'Đổi mật khẩu thành công' };
};
