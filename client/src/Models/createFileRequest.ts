//Интерфейсы данных для создания файла и объекта файла.
export interface CreateFileRequest {
    link: string
    folderName: string
}

export interface IFile {
    id: string
    name: string
}