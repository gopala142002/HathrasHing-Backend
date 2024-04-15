import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, database } from "../../config.js";

// controller for user sign-up
export const UserSignUp = async (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const docRef = doc(database, "users", email);
  const user={
    email: email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: phoneNumber,
    cartItems: [],
    purchasedHistory: [],
  };
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setDoc(docRef,user)
      res.send({success:true,message:"User signed Up successfully !!!",user:user});
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

// controller for user sign-in
export const UserSignIn = async (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  const docRef=doc(database,"users",email);
  const data=await getDoc(docRef);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log(userCredential);
      const user = userCredential.user;
      res.send({
        success: true,
        message: "User Signed In Successfully",
        user: data,
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

//controller to reset password
export const ResetPassword = (req, res) => {
  try {
    const email = req.body.email;
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.send({
          success: true,
          message: "Password reset link sent successfully!!!",
        });
      })
      .catch((error) => {
        res.send({
          success: false,
          message: "Could'nt share password rest link!!!",
          error: error,
        });
      });
  } catch (error) {
    res.send({ success: false, message: "Could'nt reset password" });
  }
};
