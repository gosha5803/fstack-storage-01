module.exports = class FileDto {
    constructor(model) {
        this.id = model._id
        this.name = model.name
    }
}