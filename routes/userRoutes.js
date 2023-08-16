const express = require('express')
const app = express()
const parser = require('body-parser')
const userController = require('../controllers/userController')
const createToken = require("../middleware/userMiddleware")


app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

app.post("/signup",userController.signup)
app.post("/login",userController.userLogin)
app.get("/products",createToken,userController.allProducts)
app.get("/products/:id",createToken,userController.specifiedProduct)
app.get("/products/categories/:categories",createToken,userController.productCategory)
app.post("/products/cart/:id",createToken,userController.addToCart)
app.get("/cartitems",createToken,userController.getCart)
app.delete("/cartitems/:id",createToken,userController.removeCartItems)
app.post("/product/wishlist/:id",createToken,userController.addToWishlist)
app.get("/product/wishlist",createToken,userController.getWishlistItems)
app.delete("/product/wishlist/:id",createToken,userController.removeWishlistItems)
app.post("/order/:id",createToken,userController.productOrder)


module.exports=app
