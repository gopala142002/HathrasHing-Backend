import { collection, deleteDoc, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import { app, database } from "../config.js";

// to get list of all the products

export const getAllUsers = async (req, res) => {
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

// to get list of all the products

export const getAllProducts = async (req, res) => {
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

export const addProduct = async (req, res) => {
    try{
      const productID=req.body.id;
      const productName=req.body.productName;
      const productDesc=req.body.description;
      const price=req.body.price;
      const docRef=doc(database,"products",productID);
      const product=await getDoc(docRef);
      if(product.exists()){
        res.send({success:false , message:"Product with same ID already present !!!"});
      }
      else{
        const pData={
          productID:productID,
          productName:productName,
          productDesc:productDesc,
          price:price
        };
        setDoc(docRef,pData);
        res.send({success:true,message:"Product added successfully !!!",product:pData});
      }
    }catch(error){
      res.send({success:false ,message:"Could not add product !!!"});
    }
};

// to get details of a product

export const productDetail = async (req, res) => {
  try {
    const productID = req.params["id"];
    const docRef = doc(database, "products", `${productID}`);
    const product = await getDoc(docRef);
    res.send({ success: true, product: product.data() });
  } catch (error) {
    res.send({ success: false, error: error });
  }
};

// to update admin information 

export const updateAdminInfo=async(req,res)=>{
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

export const deleteuser=async(req,res)=>{
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


// to delete a product 

export const deleteProduct=async(req,res)=>{
  try{
    const email=req.params["id"];
    const docRef=doc(database,"users",id);
    await deleteDoc(docRef).then(()=>{
      res.send({success:true,message:"Product deleted Successfully !!!"});
    }).catch((error)=>{
      res.send({success:false , message:"Could not delete a product !!!"});
    })
  }catch(error){
    res.send({success:false , message:"Could not delete a product !!!"});
  }
}