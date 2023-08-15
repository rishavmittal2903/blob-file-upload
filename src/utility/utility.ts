import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";
import { FileInfo } from "../component/FileInfo/FileInfo";
import {
  blobServiceUrl,
  containerName,
  getDownloadUrl,
  getSaSTokenUrl,
} from "../constants/ApiEndpoint";

export const getFileName = (item: any): string => {
  const items: Array<string> = item?.split("/");
  return items[items.length - 1];
};

export const getBlobsInContainer = async (sasToken: string) => {
  const blobService = new BlobServiceClient(blobServiceUrl(sasToken));
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);

  // get list of blobs in container
  const returnedBlobData: Array<any> = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    if (blob && blob?.properties) {
      returnedBlobData.push({
        Name: blob.name,
        type: blob.properties?.contentType,
        CreatedOn: new Date(blob?.properties?.createdOn || "").toLocaleString(),
        ModifiedOn: new Date(
          blob?.properties?.lastModified || ""
        ).toLocaleString(),
        Size: formatSizeUnits(blob?.properties?.contentLength),
      });
    }
  }

  return returnedBlobData;
};

export const isFilesUploadingCompleted = (files: Array<FileInfo>) => {
  let isCompleted: boolean = true;
  for (let file of files) {
    if (!file.fileObj.isUploaded) {
      isCompleted = false;
    }
    if (file.fileObj.isCanceled) {
      isCompleted = true;
    }
    if (file.fileObj.isFailed) {
      isCompleted = true;
    }
  }
  return isCompleted;
};

export const formatSizeUnits = (bytes: any) => {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes === 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
};

export const getSeconds = (initialTime: any, finalTime: any) => {
  const ms: number = finalTime.getTime() - initialTime.getTime();
  return getTimeInFormat(Math.floor((ms / 1000) % 60));
};

export const getTimeInFormat = (seconds: any) => {
  if (seconds > 3600) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingminutes = Math.floor(seconds % 60);
    seconds =
      hours +
      " hours" +
      (remainingminutes ? " and" + remainingminutes + " minutes" : "");
  } else if (seconds >= 60 && seconds <= 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    seconds =
      minutes +
      "minutes" +
      (remainingSeconds ? " and" + remainingSeconds + " seconds" : "");
  } else if (seconds < 60) {
    seconds = seconds + " seconds";
  } else {
    seconds = seconds + " seconds";
  }
  return seconds;
};

export const isFileExists = (BlobData: any, files: any) => {
  if (BlobData && files) {
    const fileNames: Array<string> = Object.values(files)?.map((file: any) =>
      file?.name?.toLowerCase()
    );
    const blobFileNames: Array<string> = BlobData?.map((blob: any) =>
      blob?.Name?.toLowerCase()
    );
    return fileNames.filter((file: string) => blobFileNames.includes(file));
  }
  return [];
};
const downloadFromStream = (
  resultByte: any,
  type: string,
  fileName: string
) => {
  var blob = new Blob([resultByte], { type: type });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
export const getSaSTokenForBlob = async () => {
  try {
    const response = await axios.get(getSaSTokenUrl);
    return response?.data;
  } catch (err) {
    console.log("error", err);
    return "";
  }
};

export const downloadBlobToFile = async (
  sasToken: string,
  blobName: string,
  type?: string
) => {
  const blobService = new BlobServiceClient(blobServiceUrl(sasToken));
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);
  const blobClient = await containerClient.getBlobClient(blobName);

  const downloadedFile = await blobClient.downloadToFile(blobName);
  console.log(`download of ${JSON.stringify(downloadedFile)} success`);
};

export const downloadFileToBuffer = async (blobName: string, type: string) => {
  try {
    const response = await axios.get(getDownloadUrl(blobName));
    downloadFromStream(response?.data, type, blobName);
    return response?.data;
  } catch (err) {
    console.log("error", err);
    return "";
  }
};
