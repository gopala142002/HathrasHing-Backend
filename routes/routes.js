import express from "express";
import {resetPassword, userSignIn, userSignUp } from "../auth/user.js";
import { adminSignIn, adminSignUp, resetPasswordAdmin } from "../auth/admin.js";
import { addItemToCart, deleteItemFromCart, getCartDetails, getProducts, getPurchasedHistory, updateUserInfo } from "../user/usercontrollers.js";
import { addProduct, deleteProduct, deleteuser, getAllProducts, getAllUsers, productDetail, updateProductQuantity } from "../admin/admincontrollers.js";
const routes=express.Router();


// user route

routes.post('/signup',userSignUp);
routes.get('/signin',userSignIn);
routes.put('/resetpassword',resetPassword);
routes.get('/cartdetail',getCartDetails);
routes.get('/getPurchasedHistory',getPurchasedHistory);
routes.put('/additemtocart/:id',addItemToCart);
routes.put('/deleteitemfromcart/:id',deleteItemFromCart);
routes.put('/updateuserinfo',updateUserInfo);
routes.get('/getproducts',getProducts);

// admin route

routes.post('/admin-signup',adminSignUp);
routes.get('/admin-signin',adminSignIn);
routes.put('/admin-resetpassword',resetPasswordAdmin);
routes.get('/getallusers',getAllUsers);
routes.get('/getallproducts',getAllProducts);
routes.get('/product-detail/:id',productDetail);
routes.post('/addproduct',addProduct);
routes.delete('/deleteuser/:email',deleteuser);
routes.delete('/deleteproduct.:id',deleteProduct);
routes.put('/updateproductquantity/:id',updateProductQuantity);
export default routes;