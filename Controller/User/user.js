import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { app, database } from "../../config.js";



// to get purchased history
export const GetPurchasedHistory = async (req, res) => {
  try {
    const email = req.body.email;
    const docRef = doc(database, "users", email);
    const user = await getDoc(docRef);
    console.log(user.data());
    res.send({ success: true, purchasedHistory: user.data().purchasedHistory });
  } catch (error) {
    res.send({
      success: false,
      message: "Could'nt load purchased history !!!",
    });
  }
};


//to update user details
export const UpdateUserInfo = async (req, res) => {
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
export const GetProducts = async (req, res) => {
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
