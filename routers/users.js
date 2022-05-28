const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const userController = require('../controllers/users')
const {
    isInvited
} = require('../middleware')


router.route('/register')
    .get(userController.renderRegisterPage)
    .post(isInvited, catchAsync(userController.createNewUser))

router.route('/login')
    .get(userController.renderLoginPage)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), userController.login)

router.route('/logout')
    .get(userController.logout)

module.exports = router
