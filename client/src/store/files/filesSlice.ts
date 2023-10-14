import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { FilesState, IFile } from "./types";

const initialState: FilesState = {
    currentFile: {} as IFile,
    childFiles: [],
    parents: []
}


const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setCurrentFile: (state: FilesState, action: PayloadAction<IFile>) => {
            state.currentFile = action.payload
        },
        setChildren: (state: FilesState, action: PayloadAction<IFile[]>) => {
            state.childFiles = action.payload
        },
        addParent: (state: FilesState, action: PayloadAction<IFile>) => {
            state.parents.push(action.payload)
        },
        changeParents: (state: FilesState, action: PayloadAction<string>) => {
            console.log(action.payload)
            const currentParentIndex = state.parents.findIndex(parent => parent.id == action.payload)
            console.log(currentParentIndex)
            state.parents.splice(currentParentIndex)
        }
    }
})

export const {setCurrentFile, setChildren, addParent, changeParents} = filesSlice.actions
export default filesSlice.reducer