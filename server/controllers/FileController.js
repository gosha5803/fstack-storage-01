const FileService = require("../services/FileService")

class FileController {
    async createFile(req, res, next) {
        try {
            const parrentID = req.params.link
            const {folderName} = req.body 
            const newFolder = await FileService.createDir(parrentID, folderName)
            return res.json(newFolder)
        } catch (e) {
            next(e)
        }
    }

    async removeFile(req, res, next) {
        try {
            const fileId = req.params.link
            const user = await FileService.removeDir(fileId)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async getChildren(req, res, next) {
        try {
            const currentFileId = req.params.link
            const childFiles = await FileService.getChildren(currentFileId)
            return res.json(childFiles)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FileController()