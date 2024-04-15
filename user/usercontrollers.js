import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { app, database } from "../config.js";

// to get cart detail
export const getCartDetails = async (req, res) => {
  try {
    const email = req.body.email;
    const docRef = doc(database, "users", email);
    const user = await getDoc(docRef);
    res.send({ success: true, cartDetail: user.data().cartItems });
  } catch (error) {
    console.log({ success: false, message: "Could'nt load cart details !!!" });
  }
};

// to get purchased history
export const getPurchasedHistory = async (req, res) => {
  try {
    const email = req.body.email;
    const docRef = doc(database, "users", email);
    const user = await getDoc(docRef);
    res.send({ success: true, purchasedHistory: user.data().purchasedHistory });
  } catch (error) {
    res.send({
      success: false,
      message: "Could'nt load purchased history !!!",
    });
  }
};

// to add a product to cart
export const addItemToCart = async (req, res) => {
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
export const deleteItemFromCart = async (req, res) => {
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

//to update user details
export const updateUserInfo = async (req, res) => {
  try {
    const email = req.body.email;
    updateDoc(doc(database, "users", email), {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })
      .then(() => {
        res.send({
          success: true,
          message: "User information updated successfully !!!",
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: "Could not update user detail !!!",
          error: err,
        });
      });
  } catch (error) {
    res.send({ success: false, message: "Could not update user detail !!!" });
  }
};

// all the products to render
export const getProducts = async (req, res) => {
  try {
    const collectionRef = collection(database, "products");
    let products = [];
    await getDocs(collectionRef).then((data) => {
      data.docs.forEach((doc) => {
        const temp = { ...doc.data() };
        products.push({
          productID: temp.productID,
          productName: temp.productName,
          productDesc: temp.productDesc,
          price: temp.price,
          outofStock:`${temp.quantity == 0}`
        });
      });
    });
    res.send({ success: true, products: products });
  } catch (error) {
    res.send({ success: false, message: "Error fetching products !!!" });
  }
};
