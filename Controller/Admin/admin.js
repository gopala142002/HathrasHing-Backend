import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import { app, database } from "../../config.js";

// to get list of all the users

export const GetAllUsers = async (req, res) => {
  try {
    const collectionRef = collection(database, "users");
    let users = [];
    await getDocs(collectionRef).then((data) => {
      data.docs.forEach((doc) => {
        const temp = { ...doc.data() };
        users.push(temp);
      });
    });
    res.send({ success: true, users: users });
  } catch (error) {
    res.send({ success: false, error: error });
  }
};


// to update admin information 

export const UpdateAdminInfo=async(req,res)=>{
  try{
    const email=req.body.email;
    updateDoc(doc(database, "users", email), {
      firstName:req.body.firstName,
      lastName:req.body.lastName
    })
      .then(() => {
        res.send({
          success: true,
          message: "Admin information updated successfully !!!",
        });
      })
      .catch((err) => {
        res.send({ success: false,message:"Could not update admin detail's !!!",error:err});
      });
  }catch(error){
    res.send({success:false,message:"Could not update user detail's !!!"});
  }
}

// to delete a particular user

export const DeleteUser=async(req,res)=>{
  try{
    const email=req.params["email"];
    const docRef=doc(database,"users",email);
    await deleteDoc(docRef).then(()=>{
      res.send({success:true,message:"User deleted Successfully !!!"});
    }).catch((error)=>{
      res.send({success:false , message:"Could not delete a user !!!"});
    })
  }catch(error){
    res.send({success:false , message:"Could not delete a user !!!"});
  }
}




