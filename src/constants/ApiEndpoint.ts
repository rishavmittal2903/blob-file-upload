export const storageAccountName:string = process.env.REACT_APP_ACCOUNT_NAME|| '';
export const sasToken:string = process.env.REACT_APP_SAS_TOKEN || '';
export const containerName:string= process.env.REACT_APP_CONTAINER_NAME || '';
export const blobClientUrl=(blobName:string):string=>`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`
export const blobServiceUrl:string= `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;