import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";

// controller for admin-sign-up
export const adminSignUp = async (req, res) => {
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
export const adminSignIn = async (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  const docRef = doc(data, "Admins", email);
  const admin = await getDoc(docRef);
  if (admin.exists()) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        res.send({
          success: true,
          message: "User Signed In Successfully",
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

//controller to reset password for admin
export const resetPasswordAdmin = (req, res) => {
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
