import bcrypt from 'bcrypt';
import db from '../models/index.js'; 
const { User } = db;

export const createUser = async (name, email, password) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) return { EC: 1, EM: 'Email exists' };
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role: 'USER' });
  return { EC: 0, DT: { id: user.id, name: user.name, email: user.email } };
};

export const getUsers = () => User.findAll({ attributes: ['id','name','email','role'] });
