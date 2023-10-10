const jwt = require('jsonwebtoken')
const Token = require('../Models/TokenModel')
const { Unauthorized } = require('../utils/authErrors')

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn:'15m'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn:'30d'})

        return {accessToken, refreshToken}
    }

    async saveToken(refreshToken, userId) {
        const oldToken = await Token.findOne({user: userId})
        if (oldToken) {
            oldToken.token = refreshToken
            await oldToken.save()
            return oldToken
        }

        const newToken = await Token.create({user:userId, token: refreshToken})
        return newToken
    }

    async removeToken(refreshToken) {
        await Token.findOneAndRemove({token: refreshToken})
    }

    async refreshToken(refresh) {
        try {
            const validRefreshToken = jwt.verify(refresh, process.env.REFRESH_SECRET)
            if(!validRefreshToken) {
                throw new Unauthorized()
            }
            return validRefreshToken.email
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()