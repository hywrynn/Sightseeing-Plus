const User = require('../models/user')


const renderRegisterPage = (req, res) => {
    res.render('users/register')
}

const createNewUser = async (req, res, next) => {
    try {
        const {
            email,
            username,
            password
        } = req.body
        const user = new User({
            email,
            username
        })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) {
                return next(err)
            }
            req.flash('success', `Hello, ${username}! Welcome to Sightseeing Plus!`)
            res.redirect('/journals')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

const renderLoginPage = (req, res) => {
    res.render('users/login')
}

const login = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = req.session.returnTo || '/journals'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

const logout = (req, res) => {
    req.logout()
    req.flash('success', 'Goodbye!')
    res.redirect('/journals')
}

const userController = {
    renderRegisterPage: renderRegisterPage,
    createNewUser: createNewUser,
    renderLoginPage: renderLoginPage,
    login: login,
    logout: logout
}

module.exports = userController
