import { Request, Response } from 'express';
import CRUDService from '../services/CRUDService';

export const getHomePage = async (req: Request, res: Response) => {
  return res.render('home.ejs');
};

export const getCRUD = (req: Request, res: Response) => {
  return res.render('crud.ejs');
};

export const postCRUD = async (req: Request, res: Response) => {
  const msg = await CRUDService.createNewUser(req.body);
  console.log(msg);
  return res.redirect('/register-success');
};

export const getAllCRUD = async (req: Request, res: Response) => {
  const users = await CRUDService.getAllUsers();
  return res.render('users/findAllUser.ejs', { dataList: users });
};

export const getEditCRUD = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const user = await CRUDService.getUserById(Number(id));
  return res.render('users/updateUser.ejs', { data: user });
};

export const putCRUD = async (req: Request, res: Response) => {
  const users = await CRUDService.updateUser(req.body);
  return res.render('users/findAllUser.ejs', { dataList: users });
};

export const deleteCRUD = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  await CRUDService.deleteUserById(Number(id));
  return res.redirect('/get-crud');
};

export const getRegisterSuccess = (req: Request, res: Response) => {
  return res.render('users/registerSuccess.ejs');
};
