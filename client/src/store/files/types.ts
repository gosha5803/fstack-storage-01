//Типы для состояния File
export interface IFile {
    name: string
    id: string
}

export interface FilesState {
    currentFile: IFile
    childFiles: IFile[]
    parents: IFile[]
}