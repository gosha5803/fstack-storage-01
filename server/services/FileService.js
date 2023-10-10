const fs = require('fs')
const path = require('path')
const User = require("../Models/UserModel");
const File = require("../Models/FileModel")

class FileService {
    async createDir(parrentID, name = '') {
        const parrentFile = await File.findById(parrentID)
        if(!parrentFile) {
            throw new Error('Неверный id пользователя')
        }

        const user = await User.findById(parrentFile.user)
                
        const newFile = await File.create({user: user._id, name, parent:`${parrentFile.parent}\\${parrentFile.name}`})
        fs.mkdirSync(path.resolve(newFile.parent, newFile.name))
        
        user.files.push(newFile)
        await user.save()
        return newFile
    }

    async createBasicUserDir(user) {
        const newFile = await File.create({user: user.id, name: `User_${user.id.toString()}_main`})
        fs.mkdirSync(path.resolve(newFile.parent, newFile.name))
        
        user.files.push(newFile)
        await user.save()
    }

    async removeDir(dirId) {
        try {
            const fileToRemove = await File.findByIdAndRemove(dirId)
            if (!fileToRemove) {
                throw new Error('Ошибочный айди файла')
            }

            fs.rmdirSync(`${fileToRemove.parent}\\${fileToRemove.name}`)

            const user = await User.findById(fileToRemove.user)
            user.files = user.files.filter(file => file._id.toString() !== fileToRemove._id.toString())
            await user.save()
            
            return user  
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = new FileService()