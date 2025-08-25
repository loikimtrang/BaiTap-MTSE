import { Request, Response } from 'express';
import * as CRUDService from '../services/CRUDService';

export const getHomePage = async (req: Request, res: Response) => {
  const users = await CRUDService.getAllUsers();
  res.render('crud.ejs', { data: users });
};

export const postCRUD = async (req: Request, res: Response) => {
  await CRUDService.createNewUser(req.body);
  res.redirect('/');
};

export const getCRUD = async (req: Request, res: Response) => {
  const users = await CRUDService.getAllUsers();
  res.render('users/findAllUser.ejs', { dataTable: users });
};

export const editCRUD = async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string);
  const user = await CRUDService.getUserById(id);
  res.render('users/updateUser.ejs', { user });
};

export const putCRUD = async (req: Request, res: Response) => {
  await CRUDService.updateUser(req.body);
  res.redirect('/get-crud');
};

export const deleteCRUD = async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string);
  await CRUDService.deleteUserById(id);
  res.redirect('/get-crud');
};
