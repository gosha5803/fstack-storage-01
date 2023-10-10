const userService = require('../services/UserServise')
const {validationResult} = require('express-validator')

class UserController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body
            const result = validationResult(req)
            if(!result.isEmpty()) {
                return res.json(result.array())
            }
            
            const userData = await userService.register(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600000, httpOnly: true})
            res.cookie('userId', userData.user.id, {maxAge: 30 * 24 * 3600000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            res.json({message: e.message})
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            res.json({message: e.message})
        }
    }
}

module.exports = new UserController()