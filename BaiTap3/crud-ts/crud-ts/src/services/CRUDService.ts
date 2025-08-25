import bcrypt from 'bcryptjs';
import User from '../models/user'; // Chỉ cần import User

// Định nghĩa interface cho dữ liệu đầu vào
interface UserInput {
  id?: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  address: string;
  gender?: string;
  phoneNumber?: string;
  roleId?: string;
}

// CREATE
const createNewUser = async (data: UserInput): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(data.password || '', 10);

    console.log("Incoming data:", data);

    await User.create({
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

// READ ALL
const getAllUsers = async (): Promise<User[]> => {
  return await User.findAll();
};

// READ ONE
const getUserById = async (id: number): Promise<User | null> => {
  return await User.findOne({ where: { id } });
};

// UPDATE
const updateUser = async (data: UserInput): Promise<User[]> => {
  const user = await User.findOne({ where: { id: data.id } });
  if (user) {
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.address = data.address;
    await user.save();
    return await getAllUsers();
  }
  return [];
};

// DELETE
const deleteUserById = async (id: number): Promise<void> => {
  const user = await User.findOne({ where: { id } });
  if (user) await user.destroy();
};

export default {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
