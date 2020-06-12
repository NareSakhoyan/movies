const express = require('express')
const {UserController} = require("../controllers/user.controller")

module.exports = app => {

    let router = express.Router(app)

    router.get('/', UserController.findWithEmail)


}