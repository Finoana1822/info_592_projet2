import { FolderType } from "./folder.type";

export type FileType = {
    id: number;
    dateOfCreation: Date;
    file: string;
    folder: FolderType
}