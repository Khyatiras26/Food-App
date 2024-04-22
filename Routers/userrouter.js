const express = require('express');
const {getUser, getAllUsers, updateUser, deleteUser} = require('../Controller/userController')
const {signup, login , isAuthorised , protectRoute} = require('../Controller/authController')





const userRouter=express.Router();

//user's options
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)


userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUsers)

module.exports = userRouter;