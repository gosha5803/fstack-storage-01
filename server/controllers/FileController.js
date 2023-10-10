const FileService = require("../services/FileService")

class FileController {
    async createFile(req, res, next) {
        try {
            const parrentID = req.params.link
            const {folderName} = req.body 
            const newFolder = await FileService.createDir(parrentID, folderName)
            return res.json(newFolder)
        } catch (e) {
            res.json(e.message)
        }
    }

    async removeFile(req, res, next) {
        try {
            const fileId = req.params.link
            const user = await FileService.removeDir(fileId)
            return res.json(user)
        } catch (e) {
            res.json(e)
        }
    }
}

module.exports = new FileController()