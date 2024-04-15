import express from "express";
import { AddProduct, DeleteProduct, GetAllProducts, ProductDetail, UpdateProductQuantity } from "../Controller/Admin/product.js";
import { DeleteUser, GetAllUsers } from "../Controller/Admin/admin.js";
import { AdminSignIn, AdminSignUp, ResetPasswordAdmin } from "../Controller/auth/admin.js";
const routes1=express.Router();

// admin route

routes1.post('/admin-signup',AdminSignUp);
routes1.get('/admin-signin',AdminSignIn);
routes1.put('/admin-resetpassword',ResetPasswordAdmin);
routes1.get('/getallusers',GetAllUsers);
routes1.get('/getallproducts',GetAllProducts);
routes1.get('/product-detail/:id',ProductDetail);
routes1.post('/addproduct',AddProduct);
routes1.delete('/deleteuser/:email',DeleteUser);
routes1.delete('/deleteproduct.:id',DeleteProduct);
routes1.put('/updateproductquantity/:id',UpdateProductQuantity);

export default routes1;