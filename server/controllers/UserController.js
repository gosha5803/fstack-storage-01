const userService = require('../services/UserServise')
const {validationResult} = require('express-validator')
const { BadRequest } = require('../utils/authErrors')

class UserController {
    async register(req, res, next) {
        try {
            const {email, password, login} = req.body
            const result = validationResult(req)
            if(!result.isEmpty()) {
                next(BadRequest('Неправильный формат логина или пароля', result.array()))
            }
            
            const userData = await userService.register(email, password, login)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600000, httpOnly: true})
            // res.cookie('userId', userData.user.id, {maxAge: 30 * 24 * 3600000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await userService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.json({message: 'вы вышли'})
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken
            const userData = await userService.refreshToken(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
           next(e)
        }
    }
}

module.exports = new UserController()