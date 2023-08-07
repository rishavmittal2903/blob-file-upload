import { AbortController } from "@azure/abort-controller";
import { BlobServiceClient, AnonymousCredential } from "@azure/storage-blob";
import { blobServiceUrl, containerName } from "../../constants/ApiEndpoint";
import { IFileUpload } from "../../interfaces/IFileUpload";

export class FileInfo {
  file: File;
  fileObj:IFileUpload;
  value = 0;
  controller:any;
  sasToken='';
  constructor(message: File, fileObj:IFileUpload, sasToken:string) {
    this.file = message;
    this.fileObj=fileObj;
    this.controller= new AbortController();
    this.sasToken=sasToken;
  }

  async upload(sasToken:string) {
    try {
      const blobServiceClient = new BlobServiceClient(
        blobServiceUrl(sasToken),
        new AnonymousCredential()
      );

      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blob = containerClient.getBlockBlobClient(this.file.name);
      this.fileObj.initialTime=new Date();
      console.log(`start uploading file ${this.file.name}`);
      const total = this.file.size;
      await blob.uploadBrowserData(this.file, {
        abortSignal: this.controller.signal,
        blobHTTPHeaders: { blobContentType: this.file.type },
        blockSize: 4 * 1024 * 1024,
        onProgress: (ev) => {
          console.log(`You have uploaded ${ev.loadedBytes} bytes`);
          this.fileObj.progress=Math.round((100 * ev.loadedBytes) / total);
          this.value = Math.round((100 * ev.loadedBytes) / total);
          console.log('value',this.value);
          this.fileObj.updateData(this.fileObj);
        },
      });
      this.fileObj.finalTime=new Date();
      this.fileObj.isUploaded=true;
      this.fileObj.updateData(this.fileObj);
      if(this.fileObj.getDocumentList){
      this.fileObj.getDocumentList();
      }
      console.log(` upload file ${this.file.name} successfully`);
    } catch (error:any) {
      this.fileObj.isFailed=error?.name==="AbortError" ? false:true;
      this.fileObj.isCanceled=error?.name==="AbortError" ? true:false;
      this.fileObj.updateData(this.fileObj);
      console.log(
        `cannot upload file ${this.file.name}, it return error ${error}`
      );
    }
  }

  cancel(control:any, fileObj:IFileUpload) {
    control.abort();
    const obj= Object.assign({},fileObj)
    obj.isCanceled=true;
    obj.updateData(obj);
  }
}
