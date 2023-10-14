export interface IFile {
    name: string
    id: string
}

export interface FilesState {
    currentFile: IFile
    childFiles: IFile[]
}