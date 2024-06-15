import { FileType } from "../@types/file.type";
import { folderData } from "./folder";

export const fileData = [
  {
    id: 1,
    dateOfCreation: new Date("2023-01-01"),
    file: "file1.pdf",
    folder: folderData[0],
  },
  {
    id: 2,
    dateOfCreation: new Date("2023-02-01"),
    file: "file2.archive",
    folder: folderData[0],
  },
  {
    id: 3,
    dateOfCreation: new Date("2023-03-01"),
    file: "file3.word",
    folder: folderData[0],
  },
  {
    id: 4,
    dateOfCreation: new Date("2023-04-01"),
    file: "file4.word",
    folder: folderData[3],
  },
  {
    id: 5,
    dateOfCreation: new Date("2023-05-01"),
    file: "file5.pdf",
    folder: folderData[4],
  },
  {
    id: 6,
    dateOfCreation: new Date("2023-06-01"),
    file: "file6.archive",
    folder: folderData[5],
  },
  {
    id: 7,
    dateOfCreation: new Date("2023-07-01"),
    file: "file7.word",
    folder: folderData[6],
  },
  {
    id: 8,
    dateOfCreation: new Date("2023-08-01"),
    file: "file8.pdf",
    folder: folderData[7],
  },
  {
    id: 9,
    dateOfCreation: new Date("2023-09-01"),
    file: "file9.archive",
    folder: folderData[8],
  },
  {
    id: 10,
    dateOfCreation: new Date("2023-10-01"),
    file: "file10.pdf",
    folder: folderData[13],
  },
] as FileType[];
