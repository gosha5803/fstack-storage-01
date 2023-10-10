const User = require("../Models/UserModel");
const bcrypt = require('bcrypt')
const tokenService = require('./TokeService');
const UserDto = require("../dto/UserDto");
const FileService = require('./FileService');
const { BadRequest, Unauthorized } = require("../utils/authErrors");

class UserService {
    async register(email, password, login) {
        try {
            const candidate = User.findOne({email})
            if(candidate) {
                throw BadRequest('Пользователь с таким email уже существует')
            }

            const hashedPassword = await bcrypt.hash(password, 4)
            const user = await User.create({email, password: hashedPassword, login})

            const userDto = new UserDto(user)
            const tokens = await tokenService.generateTokens({...userDto})
            await FileService.createBasicUserDir(user)
            // user.files.push(mainFile)
            // await user.save()
            await tokenService.saveToken(tokens.refreshToken, user.id)
            return {...tokens, user: userDto}
        } catch (e) {
            throw e
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({email})
            if (!user) {
                throw BadRequest('Пользователя с таким email не существует')
            }

            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                throw BadRequest('Неверный пароль')
            }

            const userDto = new UserDto(user)
            const tokens = await tokenService.generateTokens({...userDto})
            await tokenService.saveToken(tokens.refreshToken, user.id)

            return {...tokens, user: userDto}
        } catch (e) {
            throw e
        }
    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken)
    }

    async refreshToken(token) {
            const userEmail = await tokenService.refreshToken(token)
            if(!userEmail) {
                throw Unauthorized()
            }
            
            const user = await User.findOne({email: userEmail})
            const userDto = new UserDto(user)
            const tokens = await tokenService.generateTokens({...userDto})
            
            await tokenService.saveToken(tokens.refreshToken, user.id)
            return {...tokens, user: userDto}
    }
}

module.exports = new UserService()