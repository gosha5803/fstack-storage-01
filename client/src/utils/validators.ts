import { IFile } from "../store/files/types"

//Объект валидаторов для валидации форм содержит валидации для email, password и валидацию создания папки(метод). 
export const Validators = {
    email: {
        required: {
            value: true,
            message: 'Введите почту!'
        },
        pattern: {
            value:/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/,
            message: 'Неверный формат почты!'
        }
        
    },
    login: {
        required: {
            value: true,
            message: 'Введите login!'
        },
        minLength: {
            value: 5,
            message: 'Минимальная длина логина 5 символов'
        }
    },
    password: {
        required: {
            value: true,
            message: 'Введите пароль!'
        },
        validate: (password:string) => passwordConfigValidator(password)
    },

    // Метод принимающийй в себя существующие файлы и проверяющи содержимое формы на совпадение с названиями существующих файлов.)
    createFolder: (existingFiles: IFile[] | undefined) => ({
        validate: {
            value: (fileName: string) => {
                if(!existingFiles) {
                    return true
                }
                if(!fileName.length) {
                    return 'Введите название папки!'
                }
                return !existingFiles.filter(file => file.name === fileName).length ? true : 'Папка с таким именем уже существует' 
            }
        },

    })
}

//Метод для проверки пароля на наличие Специального символа, заглавной буквы, строчной буквы и на минимальную длину.
function passwordConfigValidator(password: string): boolean | string {
    const params = {
        length: false,
        lowerCase: false, 
        upperCase: false,
        nums:false
        }

        for (let i = 0; i < password.length; i++) {
        if (i > 8) {
            params.length = true
        }

        if (String(+password[i]) !== 'NaN') {
            params.nums = true
            continue
        }
        if (password[i].toLowerCase() === password[i]) {
            params.lowerCase = true
        }

        if (password[i].toUpperCase() === password[i]) {
            params.upperCase = true
        }


    }

    return  (params.length) &&
            (params.lowerCase) && 
            (params.upperCase) && 
            (params.nums) || 
            (
            !params.lowerCase ? 'Хотябы одна строчная буква' 
            : 
            !params.upperCase ? 'Хотябы одна заглавная буква' 
            : 
            !params.nums ? 'Хотябы одна цифра' 
            : 
            !params.length ? 'Минимальная длина 8 символов' 
            : '')
}