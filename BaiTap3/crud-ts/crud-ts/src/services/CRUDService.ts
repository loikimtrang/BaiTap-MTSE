import User from '../models/user';

export const createNewUser = async (data: any) => {
  try {
    await User.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
    });
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};

export const updateUser = async (data: any) => {
  const user = await User.findByPk(data.id);
  if (user) {
    user.set({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
    });
    await user.save();
    return true;
  }
  return false;
};

export const deleteUserById = async (id: number) => {
  await User.destroy({ where: { id } });
};
