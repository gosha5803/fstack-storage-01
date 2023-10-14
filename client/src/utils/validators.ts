import { IFile } from "../store/files/types"

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
        // validate: (password:string) => 
    },

    createFolder: (existingFiles: IFile[] | undefined) => ({
        validate: {
            value: (fileName: string) => {
                if(!existingFiles) {
                    return true
                }
                return !existingFiles.filter(file => file.name == fileName).length ? true : 'Папка с таким именем уже существует' 
            }
        }
    }),

    // test: (message: string) => {
    //     return {
    //         required: {
    //             value: true,
    //             message
    //         }
    //     }
    // }
}

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
        if (password[i].toLowerCase() == password[i]) {
            params.lowerCase = true
        }

        if (password[i].toUpperCase() == password[i]) {
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

// function passwordValidator(password: string) {
//     const checkList = passwordConfigValidator(password)
//     console.log(checkList)


//     return {
//         required: {
//             value: true,
//             message:'Бобка'
//         },
         
//         validate: {
//             value: [
//                 checkList.length || 'Минимальная длина 8 символов',
//                 checkList.upperCase || '1 заглавный символ',
//                 checkList.lowerCase || '1 строчный символ',
//                 checkList.nums || '1 цифра',
//         ]       
//         }
// } 
// }