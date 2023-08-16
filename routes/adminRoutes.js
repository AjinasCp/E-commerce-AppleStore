const express = require('express')
const app = express()
const parser = require('body-parser')
const adminController = require('../controllers/adminController')
const adminAuth = require("../middleware/adminMiddleware")


app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

//admin routes

app.post("/login",adminController.adminLogin)
app.get("/user",adminAuth,adminController.allUser)
app.put("/update",adminAuth,adminController.editUser)
app.get("/user/:id",adminAuth,adminController.specifiedUser)
app.post("/product",adminAuth,adminController.createProducts)
app.get("/product",adminAuth,adminController.allProducts)
app.get("/product/:id",adminAuth,adminController.specifiedProduct)
app.put("/product/:id",adminAuth,adminController.editProduct)
app.delete("/product/:id",adminAuth,adminController.deleteProduct)

module.exports= app