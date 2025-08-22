import CRUDService from '../services/CRUDService.js';

let getHomePage = async (req, res) => {
  return res.render('home.ejs');
};

let getCRUD = (req, res) => {
  return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
  let msg = await CRUDService.createNewUser(req.body);
  console.log(msg);
  return res.redirect('/register-success');
};

let getAllCRUD = async (req, res) => {
  let users = await CRUDService.getAllUsers();
  return res.render('users/findAllUser.ejs', { dataList: users });
};

let getEditCRUD = async (req, res) => {
  let user = await CRUDService.getUserById(req.query.id);
  return res.render('users/updateUser.ejs', { data: user });
};

let putCRUD = async (req, res) => {
  let users = await CRUDService.updateUser(req.body);
  return res.render('users/findAllUser.ejs', { dataList: users });
};

let deleteCRUD = async (req, res) => {
  await CRUDService.deleteUserById(req.query.id);
  return res.redirect('/get-crud');
};

let getRegisterSuccess = (req, res) => {
  return res.render('users/registerSuccess.ejs');
};

export default {
  getHomePage,
  getCRUD,
  postCRUD,
  getAllCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
  getRegisterSuccess,
};
