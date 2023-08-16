const express = require("express");
const app = express();
const schema = require("../models/userModel");
const productSchema = require("../models/productModel");
const jwt = require("jsonwebtoken");

//admin login

const adminLogin = async (req, res) => {
  try {
    console.log(req.body);

    const admin = await schema.findOne({ adminid: req.body.adminid });

    if (admin) {
      if (
        admin.adminid == 111 &&
        admin.password == req.body.password &&
        admin.email == req.body.email
      ) {
        const adminToken = jwt.sign({ adminId: admin._id }, "adminsecretkey");
        res.cookie("token", adminToken);
        console.log(adminToken);
        return res
          .status(200)
          .json({ token: adminToken, message: "admin logged in succesfully" });
      } else {
        res.status(400).send({ message: "not admin" });
      }
    } else {
      res.json("account is not valid");
    }
  } catch (error) {
    console.log(error);
    res.json("server error");
  }
};

// find all users

const allUser = async (req, res) => {
  try {
    const user = await schema.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: "Try again later" });
    console.log(error);
  }
};

// find specific user

const specifiedUser = async (req, res) => {
  try {
    const spUser = await schema.findById(req.params.id);
    if (!spUser) {
      res.status(400).send({ message: "Try again later" });
      console.log(error);
      return;
    }
    res.status(200).json(spUser);
  } catch (error) {
    res.json("user not found");
  }
};

// updating user profile

const editUser = async (req, res) => {
  try {
    const edit = req.body.email;
    await schema.updateMany(
      { email: req.query.email },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.password,
        },
      }
    );
    res.status(200).send("User profile updated");
    console.log(edit);
  } catch (error) {
    res.status(400).send("profile updation failed");
    console.log(error);
  }
};
//Product section -----------------------------------------------------------

// create product

const createProducts = async (req, res) => {
  try {
    await productSchema.insertMany({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
      modelname: req.body.modelname,
      color: req.body.color,
      storage: req.body.storage,
      price: req.body.price,
    });
    res.status(200).send({ message: "Product created successfull" });
  } catch (error) {
    console.log(error);
    res.status(404).send("check the details");
  }
};

// find all Products

const allProducts = async (req, res) => {
  try {
    const allProducts = await productSchema.find();
    console.log(allProducts);
    res.status(200).send(allProducts);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "can't find the products" });
  }
};

// find specified product

const specifiedProduct = async (req, res) => {
  try {
    const findProduct = await productSchema.findById(req.params.id);
    if (!findProduct) {
      res.status(400).send({ message: "Try again later" });
      console.log(error);
      return;
    }
    res.status(200).json(findProduct);
  } catch (error) {
    res.json("user not found");
  }
};

// updating product details

const editProduct = async (req, res) => {
  try {
    const updatedProduct = req.params.id;
    console.log(updatedProduct);
    const { title, description, categories, modelname, color, storage, price } =
      req.body;

    const edit = await productSchema.findByIdAndUpdate(
      { _id: updatedProduct },
      { title, description, categories, modelname, color, storage, price }
    );
    console.log(edit);
    if (!edit) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json({ message: "product updated" });
  } catch (error) {
    res.status(500).json({ message: "not found" });
  }
};

//Delete Product

const deleteProduct = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const deletedId = await productSchema.deleteOne({ _id: deleteId });
    if (!deletedId) {
      return res.status(404).json({ message: "Product deleting failed" });
    }
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.json("error");
  }
};

module.exports = {
  adminLogin,
  allUser,
  editUser,
  specifiedUser,
  createProducts,
  allProducts,
  specifiedProduct,
  editProduct,
  deleteProduct,
};
