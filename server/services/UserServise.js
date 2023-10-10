const User = require("../Models/UserModel");
const bcrypt = require('bcrypt')
const tokenService = require('./TokeService');
const UserDto = require("../dto/UserDto");
const FileService = require('./FileService');

class UserService {
    async register(email, password) {
        try {
            const candidate = await User.findOne({email})
            if(candidate) {
                throw new Error('Пользователь с таким email уже существует')
            }

            const hashedPassword = await bcrypt.hash(password, 4)
            const user = await User.create({email, password: hashedPassword})

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
                throw new Error('Польщователя с таким email не существует')
            }

            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                throw new Error('Неверный пароль')
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
        const tokenData = await tokenService.refreshToken(token)
        if(!tokenData) {
            throw new Error('Неваоидный токен')
        }
        
        const user = User.findOne({id: tokenData.user})
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        
        await tokenService.saveToken(tokens.refreshToken, user.id)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()