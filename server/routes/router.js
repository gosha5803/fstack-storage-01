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
router.get('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)


router.post('/folders/create/:link', FilesController.createFile)
router.get('/folders/remove/:link', FilesController.removeFile)
router.get('/folders/getChildren/:link', FilesController.getChildren)
router.post('/testFile', (req, res) => {
    console.log(req.files)
    return res.json({messga: 'saks'})
})

module.exports = router

//Переписать поле title папки, и логику его записи. Переделать дизайн под гугл диск немного возможно. Добавить создание папки по правой клавише мыши, и унифицировать форму и меню возмжно.
//Сначала унифицировать пути в роутере и прописать логику создания папок до конца.