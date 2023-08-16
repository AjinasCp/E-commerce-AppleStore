//require modules

const express = require("express");
const userSchema = require("../models/userModel");
const app = require("express");
const jwt = require("jsonwebtoken");
const productSchema = require("../models/productModel");

//signup page

const signup = async (req, res) => {
  try {
    const existUser = await userSchema.findOne({ email: req.body.email });
    if (existUser) {
      return res.json("email is already exist");
    }

    await userSchema.insertMany({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
      adminid: req.body.adminid,
    });
    res.status(200).send({ message: "Account created successfull" });
  } catch (error) {
    console.log(error);
    res.status(404).send("fill the remaining field !!");
  }
};

// login page

const userLogin = async (req, res) => {
  try {
    const login = await userSchema.findOne({ email: req.body.email });
    if (login) {
      if (
        login.password === req.body.password &&
        login.email === req.body.email
      ) {
        const userToken = jwt.sign({ userId: login._id }, "mysecretkey");
        res.cookie("token", userToken);
        console.log(userToken);
        return res
          .status(200)
          .json({ token: userToken, message: "Login successfully" });
      } else {
        res.status(401).send({ message: "Wrong password" });
      }
    } else {
      res.json("incorrect details");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// product section---------------------------------

// All products

const allProducts = async (req, res) => {
  try {
    const allProducts = await productSchema.find();
    // console.log(allProducts);
    res.status(200).send(allProducts);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "products not found" });
  }
};

//  Specific Product

const specifiedProduct = async (req, res) => {
  try {
    const findProduct = await productSchema.findById(req.params.id);
    if (!findProduct) {
      res.status(400).send({ message:"Try again later" });
      console.log(error);
      return;
    }
    res.status(200).json(findProduct);
  } catch (error) {
    res.json("user not founded");
  }
};

// category section

const productCategory = async (req, res) => {
  const categoryList = req.params.categories;
  console.log(categoryList);
  try {
    if (categoryList == "iphone") {
      const findProduct = await productSchema.find({
        categories: { $in: "iphone" },
      });
      return res.json(findProduct);
    }
    if (categoryList == "ipad") {
      const findProduct = await productSchema.find({
        categories: { $in: "ipad" },
      });
      return res.json(findProduct);
    }
    if (categoryList == "imac") {
      const findProduct = await productSchema.find({
        categories: { $in: "imac" },
      });
      return res.json(findProduct);
    }
    if (categoryList == "airpods") {
      const findProduct = await productSchema.find({
        categories: { $in: "airpods" },
      });
      return res.json(findProduct);
    }
    if (categoryList == "speaker") {
      const findProduct = await productSchema.find({
        categories: { $in: "speaker" },
      });
      return res.json(findProduct);
    }
    if (categoryList == "charger") {
      const findProduct = await productSchema.find({
        categories: { $in: "charger" },
      });
      return res.json(findProduct);
    }
    if (categoryList == "iwatch") {
      const findProduct = await productSchema.find({
        categories: { $in: "iwatch" },
      });
      return res.json(findProduct);
    } else {
      res.status(401).send({ message: "category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error" });
  }
};

// Add to cart

const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const token = req.cookies.token;
    // console.log(token,"tocken...............");
    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    const user = await userSchema.findOne({ _id: decoded.userId });

    // add the product to the cart
    console.log(user);
    user.cart.push(productId);

    await user.save();

    res
      .status(200)
      .json({ message: "Product added to cart successfully", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};

// view Cart product

const getCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token, "tocken...............");
    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    const userItems = await userSchema.findOne({ _id: decoded.userId });
    console.log(userItems);

    if (!userItems) {
      return res.status(400).json({ message: "user not found in cart" });
    }
    const viewCart = userItems.cart;

    return res
      .status(200)
      .json({ message: "Your cart products", cart: viewCart });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "server error", error: error.message });
  }
};

// Remove cart items

const removeCartItems = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.cookies.token;
    // console.log(token,"tocken...............")
    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    const userItems = await userSchema.findOne({ _id: decoded.userId });
    console.log(userItems);

    if (!userItems) {
      return res.status(400).json({ message: "user not found" });
    }
    const indexNumber = userItems.cart.indexOf(productId);
    if (indexNumber == 1) {
      return res
        .status(404)
        .json({ message: "product not founded in your cart" });
    }

    userItems.cart.splice(indexNumber, 1);
    await userItems.save();
    return res.status(200).json({ message: "product removed" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "server error", error: error.message });
  }
};

//add to wishlist

const addToWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const token = req.cookies.token;
    // console.log(token,"tocken...............");
    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    const user = await userSchema.findOne({ _id: decoded.userId });

    // add the product to the cart
    console.log(user);
    user.wishlist.push(productId);

    await user.save();

    res
      .status(200)
      .json({ message: "Product added to wishlist successfully", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error", error: err.message });
  }
};

//wishlist items

const getWishlistItems = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token, "tocken...............");
    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    const user = await userSchema.findOne({ _id: decoded.userId });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const wishList = user.wishlist;

    return res.status(200).json({ message: "Your Wishlist", wish: wishList });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "server error", error: error.message });
  }
};

//remove from wishlist

const removeWishlistItems = async (req, res) => {
  try {
    const productId = req.params.id;
    const token = req.cookies.token;

    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    const user = await userSchema.findOne({ _id: decoded.userId });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const indexNumber = user.wishlist.indexOf(productId);
    if (indexNumber == 1) {
      return res
        .status(404)
        .json({ message: "product not founded in your wishlist" });
    }

    user.wishlist.splice(indexNumber, 1);
    await user.save();
    return res.status(200).json({ message: "product removed" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "server error", error: error.message });
  }
};

//order the product

const Razorpay = require("razorpay");

const productOrder = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "mysecretkey");
    console.log(decoded);
    const user = await userSchema.findOne({ _id: decoded.userId });
    console.log(user);

    const orderedDate = new Date();
    const { price } = product;

    if (price !== req.body.price) {
      return res
        .status(400)
        .json({ message: "price is not Matching with product price" });
    }

    const model = new Razorpay({
      key_id: "rzp_test_btdnAVnI9um4VI",
      key_secret: "xe58oQPIu0asNXXqFUqtWAzw",
    });

    const order = await model.orders.create({
      amount: price * 100,
      currency: "INR",
      receipt: "Receipt",
    });

    user.orders.push({
      product: productId,
      orderId: order.id,
      payment: price,
      orderedDate,
    });
    await user.save();
    res
      .status(200)
      .json({ message: "payment successfully and order confirmed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  signup,
  userLogin,
  allProducts,
  specifiedProduct,
  productCategory,
  addToCart,
  getCart,
  removeCartItems,
  addToWishlist,
  getWishlistItems,
  removeWishlistItems,
  productOrder,
  productOrder,
};
