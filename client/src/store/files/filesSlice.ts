import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { FilesState, IFile } from "./types";

const initialState: FilesState = {
    currentFile: {} as IFile,
    childFiles: []
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
        }
    }
})

export const {setCurrentFile, setChildren} = filesSlice.actions
export default filesSlice.reducer