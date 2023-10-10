module.exports = class AuthErrors extends Error {
    constructor(status, message, errors = []) {
        super(message)
        this.status = status,
        this.errors = errors
    }

    static Unauthorized() {
        return new AuthErrors(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors) {
        return new AuthErrors(400, message, errors)
    }
}