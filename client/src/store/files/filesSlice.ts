import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { FilesState, IFile } from "./types";

//Состояние файлов содержит текущий файл, его дочерние файлы и родительские.
const initialState: FilesState = {
    currentFile: {} as IFile,
    childFiles: [],
    parents: []
}

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        //Установление текущего файла.
        setCurrentFile: (state: FilesState, action: PayloadAction<IFile>) => {
            state.currentFile = action.payload
        },
        //Установление дочерних файлов.
        setChildren: (state: FilesState, action: PayloadAction<IFile[]>) => {
            state.childFiles = action.payload
        },
        //Добавление файла в массив родителей.
        addParent: (state: FilesState, action: PayloadAction<IFile>) => {
            state.parents.push(action.payload)
        },
        //переопределение родительского массива, когда пользователь переходит в папку более высокого уровня, данный экшн перебирает массив родителей пока не наткнётся на теущую папку, так как она и ее дочерние папки не могут быть её родитлями. Новый массив родителей устанавливается в стейт.
        changeParents: (state: FilesState, action: PayloadAction<{id: string, parents: IFile[]}>) => {
            const copyParents = [...state.parents]
            const newParents = []
            do{
                const parent = copyParents.shift()
                if(parent?.id === state.currentFile.id){
                    break
                }

                if(parent){
                    newParents.push(parent)
                }
            } while(copyParents.length)

            state.parents = newParents
        },
        clearFilesState: (state: FilesState) => {
            state.childFiles = []
            state.parents = []
            state.currentFile = {} as IFile
            console.log('asasasas')
        }
    }
})

export const {setCurrentFile, setChildren, addParent, changeParents, clearFilesState} = filesSlice.actions
export default filesSlice.reducer