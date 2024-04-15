import express from "express";
const routes2=express.Router();
import { ResetPassword, UserSignIn, UserSignUp } from "../../Controller/auth/user.js";
import { AddItemToCart, DeleteItemFromCart, GetCartDetails } from "../../Controller/User/cart.js";
import { GetProducts, GetPurchasedHistory, UpdateUserInfo } from "../../Controller/User/user.js";

// user route

routes2.post('/signup',UserSignUp);
routes2.get('/signin',UserSignIn);
routes2.put('/resetpassword',ResetPassword);
routes2.get('/cartdetail',GetCartDetails);
routes2.get('/getPurchasedHistory',GetPurchasedHistory);
routes2.put('/additemtocart/:id',AddItemToCart);
routes2.put('/deleteitemfromcart/:id',DeleteItemFromCart);
routes2.put('/updateuserinfo',UpdateUserInfo);
routes2.get('/getproducts',GetProducts);

export default routes2;