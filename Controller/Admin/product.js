import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app, database } from "../../config.js";

// to get list of all the products

export const GetAllProducts = async (req, res) => {
  try {
    const collectionRef = collection(database, "products");
    let products = [];
    await getDocs(collectionRef).then((data) => {
      data.docs.forEach((doc) => {
        const temp = { ...doc.data() };
        products.push(temp);
      });
    });
    res.send({ success: true, products: products });
  } catch (error) {
    res.send({ success: false, error: error });
  }
};

// to add a product to database

export const AddProduct = async (req, res) => {
  try {
    const productID = req.body.id;
    const productName = req.body.productName;
    const productDesc = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const docRef = doc(database, "products", productID);
    const product = await getDoc(docRef);
    if (product.exists()) {
      res.send({
        success: false,
        message: "Product with same ID already present !!!",
      });
    } else {
      const pData = {
        productID: productID,
        productName: productName,
        productDesc: productDesc,
        price: price,
        quantity: quantity,
      };
      setDoc(docRef, pData);
      res.send({
        success: true,
        message: "Product added successfully !!!",
        product: pData,
      });
    }
  } catch (error) {
    res.send({ success: false, message: "Could not add product !!!" });
  }
};

// to get details of a product

export const ProductDetail = async (req, res) => {
  try {
    const productID = req.params["id"];
    const docRef = doc(database, "products", `${productID}`);
    const product = await getDoc(docRef);
    res.send({ success: true, product: product.data() });
  } catch (error) {
    res.send({ success: false, error: error });
  }
};

// to delete a product

export const DeleteProduct = async (req, res) => {
  try {
    const id = req.params["id"];
    const docRef = doc(database, "users", id);
    await deleteDoc(docRef)
      .then(() => {
        res.send({
          success: true,
          message: "Product deleted Successfully !!!",
        });
      })
      .catch((error) => {
        res.send({ success: false, message: "Could not delete a product !!!" });
      });
  } catch (error) {
    res.send({ success: false, message: "Could not delete a product !!!" });
  }
};

// to increase the quantity of a product

export const UpdateProductQuantity = async (req, res) => {
  try {
    const productID = req.params["id"];
    const docRef = doc(database, "products", productID);
    const quantity = req.body.quantity;
    console.log(productID,quantity);
    await updateDoc(docRef, {
      quantity: quantity,
    })
    res.send({success:true,message:"Product quantity updated successfully !!!"});
  } catch (error) {
    res.send({
      success: false,
      message: "Could not update product quantity !!!",
    });
  }
};
