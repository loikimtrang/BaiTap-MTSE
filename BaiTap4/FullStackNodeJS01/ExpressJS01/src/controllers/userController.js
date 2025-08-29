import { createUser, getUsers } from '../services/userService.js';
import { loginService, getAccount, requestReset, resetPassword } from '../services/authService.js';

export const createUserCtrl = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await createUser(name, email, password);
  return res.status(200).json(data);
};

export const loginCtrl = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  return res.status(200).json(data);
};

export const getAccountCtrl = async (req, res) => {
  const user = await getAccount(req.user.id);
  return res.status(200).json(user);
};

export const listUsersCtrl = async (_req, res) => res.json(await getUsers());

export const forgotPasswordCtrl = async (req, res) => {
  const { email } = req.body;
  const data = await requestReset(email);
  return res.status(200).json(data);
};

export const resetPasswordCtrl = async (req, res) => {
  const { token, password } = req.body;
  const data = await resetPassword(token, password);
  return res.status(200).json(data);
};
