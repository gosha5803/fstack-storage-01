const {Router} = require('express')
const UserController = require('../controllers/UserController')
const FilesController = require('../controllers/FileController')
const router = new Router
const {body} = require('express-validator')

router.post('/register',
    body('email', 'Некорректный email').isEmail(),
    body('password', 'Пароль должен быть не окроче 8 символов').isLength({min: 8}),
    UserController.register)
router.post('/login', UserController.login)
router.get('/logout')
router.get('/refresh', UserController.refresh)


router.post('/folders/:link', FilesController.createFile)
router.get('/folders/:link', FilesController.removeFile)

module.exports = router