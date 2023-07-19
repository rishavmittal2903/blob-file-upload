import { FileInfo } from "../component/FileInfo/FileInfo";

export interface IFileUpload{
    fileId:any;
    fileName:string;
    isUploaded:boolean;
    progress:number;
    isCanceled:boolean;
    finalTime?:Date;
    initialTime?:Date;
    file?:File;
    updateData:(file:IFileUpload)=>void;
    isFailed?:boolean;
    getDocumentList?:()=>void;
}