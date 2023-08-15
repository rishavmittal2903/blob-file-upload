import { getEnvironmentVariableValueByKey } from "./Utility/Utility";

export const storageAccountName:string = getEnvironmentVariableValueByKey('ACCOUNT_NAME')|| '';
export const containerName:string= getEnvironmentVariableValueByKey('CONTAINER_NAME') || '';
export const blobServiceUrl=(sasToken:string):string=> `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

