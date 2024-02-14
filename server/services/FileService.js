const fs = require('fs')
const path = require('path')
const User = require("../Models/UserModel");
const File = require("../Models/FileModel");
const FileDto = require('../dto/FileFto');

class FileService {
    async createDir(parrentID, name = '') {
        const parrentFile = await File.findById(parrentID)
        if(!parrentFile) {
            throw new Error('Неверный id пользователя')
        }

        const user = await User.findById(parrentFile.user)
                
        const newFile = await File.create({user: user._id, name, parent:`${parrentFile.parent}\\${parrentFile.name}`})
        const fileDto = new FileDto(newFile)
        fs.mkdirSync(path.resolve(newFile.parent, newFile.name))
        
        user.files.push(newFile)
        await user.save()
        return fileDto
    }

    async createBasicUserDir(user) {
        const newFile = await File.create({user: user.id, name: `User_${user.id.toString()}_main`})
        fs.mkdirSync(path.resolve(newFile.parent, newFile.name))
        const fileDto = new FileDto(newFile)

        user.files.push(newFile)
        await user.save()
        return fileDto
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

    async getChildren(currentFileId) {
        const currentFile = await File.findById(currentFileId)
        const currentFileFullName = currentFile.parent + '\\' + currentFile.name
        const childFiles = await File.find({parent: currentFileFullName})

        const filesDto = childFiles.map(file => new FileDto(file))
        return filesDto
    }

    async uploadfile(file) {
        console.log(file)
        const parrentFile = await File.findById(parrentID)
        if(!parrentFile) {
            throw new Error('Неверный id пользователя')
        }

        const newFile = await File.create({user: user._id, name: file.name, parent:`${parrentFile.parent}\\${parrentFile.name}`})
        const fileDto = new FileDto(newFile)
        fs.writeFileSync(path.resolve(newFile.parent, newFile.name), file.data)
        
        const user = await User.findById(parrentFile.user)
        user.files.push(newFile)
        await user.save()

        return fileDto
        // const newFile = fs.writeFileSync(`C:\\Users\\Мвидео\\Desktop\\${file.name}`, file.data)
        // return file
    }
}

module.exports = new FileService()