const AuthErrors = require("../utils/authErrors")

module.exports = function errorsMiddleware(err, req, res, next) {
    if(err instanceof AuthErrors) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    } else {
        return res.status(500).json({message: 'Непредвиденная ошибка'})
    }
}