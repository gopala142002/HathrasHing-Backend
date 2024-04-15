import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { app, database } from "../../config.js";

// to get cart detail

export const GetCartDetails = async (req, res) => {
  try {
    const email = req.body.email;
    const docRef = doc(database, "users", email);
    const user = await getDoc(docRef);
    res.send({ success: true, cartDetail: user.data().cartItems });
  } catch (error) {
    console.log({ success: false, message: "Could'nt load cart details !!!" });
  }
};

// to add a product to cart

export const AddItemToCart = async (req, res) => {
  try {
    const productId = req.params["id"];
    const docRef = doc(database, "products", productId);
    const product = await getDoc(docRef);
    const email = req.body.email;
    const user = await getDoc(doc(database, "users", email));
    const cartItems = user.data().cartItems;
    cartItems.push(product.data());
    updateDoc(doc(database, "users", email), {
      cartItems: cartItems,
    })
      .then(() => {
        res.send({
          success: true,
          message: "Product Added to Cart Successfully !!!",
        });
      })
      .catch((err) => {
        res.send({ success: false, message: "Could'nt add item to cart !!!" });
      });
  } catch (error) {
    res.send({ success: false, message: "Could'nt add item to cart !!!" });
  }
};

// to delete item from cart

export const DeleteItemFromCart = async (req, res) => {
  try {
    const productId = req.params["id"];
    // console.log(productId);
    const email = req.body.email;
    const user = await getDoc(doc(database, "users", email));
    const cartItems = user.data().cartItems;
    let cartitems = [];
    cartItems.forEach((product) => {
      if (product.productID !== productId) cartitems.push(product);
    });
    console.log(cartitems);
    await updateDoc(doc(database, "users", email), {
      cartItems: cartitems,
    })
      .then(() => {
        res.send({
          success: true,
          message: "Product Deleted from Cart Successfully !!!",
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Could not delete product from cart",
          error: err,
        });
      });
  } catch (error) {
    res.send({
      success: false,
      message: "Could not delete product from cart",
      error: error,
    });
  }
};
