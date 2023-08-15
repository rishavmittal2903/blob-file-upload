import { AccountSASPermissions, AccountSASResourceTypes, AccountSASServices, BlobServiceClient, generateAccountSASQueryParameters, SASProtocol, StorageSharedKeyCredential } from "@azure/storage-blob";
import { blobServiceUrl } from "../constant";
import { getEnvironmentVariableValueByKey } from "../Utility/Utility";

export const createAccountSas= async()=>{
    const sharedKeyCredential = new StorageSharedKeyCredential(
        getEnvironmentVariableValueByKey('ACCOUNT_NAME') || '',
        getEnvironmentVariableValueByKey('ACCOUNT_KEY') || ''
    )
    const sasOptions = {
  
        services: AccountSASServices.parse("btqf").toString(),          // blobs, tables, queues, files
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(), // service, container, object
        permissions: AccountSASPermissions.parse("rwdlacupi"),          // permissions
        protocol: SASProtocol.Https,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + (10 * 60 * 1000)),   // 10 minutes
    };
  
    const sasToken = generateAccountSASQueryParameters(
        sasOptions,
        sharedKeyCredential 
    ).toString();  
    // prepend sasToken with `?`
    return (sasToken[0] === '?') ? sasToken : `?${sasToken}`;
  }

  async function streamToText(readable:any) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
    data += chunk;
    }
    return data;
}

  export const  downloadBlobToFile=async(blobName:string) =>{
      try{
      const sasToken = await createAccountSas();
      const containerName = getEnvironmentVariableValueByKey('CONTAINER_NAME')
      const serviceUrl:string = blobServiceUrl(sasToken);
      console.log(serviceUrl);
    const blobService = new BlobServiceClient(serviceUrl);
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
    const blobClient = await containerClient.getBlobClient(blobName);
    
    const downloadResponse:any = await blobClient.download();
    const downloaded = await streamToText(downloadResponse.readableStreamBody);
    console.log(`download of ${blobName} success`);
    return downloaded;
      }
      catch(err)
      {
          console.log(err);
          return 400;
      }
  }