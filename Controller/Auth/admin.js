import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, database } from "../../config.js";

// controller for admin-sign-up
export const AdminSignUp = async (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const user = {
    email: email,
    phoneNumber: phoneNumber,
  };
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const docRef = doc(database, "Admins", email);
      setDoc(docRef, user);
      res.send({
        success: false,
        message: "Admin signed Up successfully !!!",
        user: user,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.send({
        success: false,
        errorCode: errorCode,
        errorMessage: errorMessage,
      });
    });
};

// controller for admin-sign-in
export const AdminSignIn = async (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  const docRef = doc(database, "Admins", email);
  const admin = await getDoc(docRef);
  if (admin.exists()) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        res.send({
          success: true,
          message: "Admin Signed In Successfully",
          user: user,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send({
          success: false,
          errorCode: errorCode,
          errorMessage: errorMessage,
        });
      });
  }
  else{
    res.send({success:false , message:"Invalid Crendentials !!!"});
  }
};