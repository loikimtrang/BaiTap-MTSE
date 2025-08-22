import bcrypt from 'bcryptjs';
import db from '../models/index.js';

let createNewUser = async (data) => {
  try {
    let hashedPassword = await bcrypt.hash(data.password, 10);

    console.log("Incoming data:", data);

    await db.User.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      gender: data.gender === '1',  
      phoneNumber: data.phoneNumber,
      roleId: data.roleId,
    });

    return 'Created user!';
  } catch (error) {
    console.error('Error while creating user:', error); 
    throw error;
  }
};



let getAllUsers = async () => {
  return await db.User.findAll();
};

let getUserById = async (id) => {
  return await db.User.findOne({ where: { id } });
};

let updateUser = async (data) => {
  let user = await db.User.findOne({ where: { id: data.id } });
  if (user) {
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.address = data.address;
    await user.save();
    return await getAllUsers();
  }
  return [];
};

let deleteUserById = async (id) => {
  let user = await db.User.findOne({ where: { id } });
  if (user) await user.destroy();
};

export default {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
