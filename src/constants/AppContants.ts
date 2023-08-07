import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { IColumn } from "../interfaces/IFileTable";

export const fileTableColumns: Array<IColumn> = [
  { label: "Name", value: "Name" },
  { label: "Created on", value: "createdOn" },
  { label: "Modified on", value: "modifiedOn" },
  { label: "File Size", value: "fileSize" },
];