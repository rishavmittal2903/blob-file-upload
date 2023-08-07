const baseUrl = process.env.REACT_APP_BASE_URL;
export const storageAccountName:string = process.env.REACT_APP_ACCOUNT_NAME|| '';
export const containerName:string= process.env.REACT_APP_CONTAINER_NAME || '';
export const blobClientUrl=(blobName:string):string=>`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`
export const blobServiceUrl=(sasToken:string):string=> `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
export const getSaSTokenUrl=`${baseUrl}/api/fileUplaod/getSaSToken`