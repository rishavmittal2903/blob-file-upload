import { AccountSASPermissions, AccountSASResourceTypes, AccountSASServices, generateAccountSASQueryParameters, SASProtocol, StorageSharedKeyCredential } from "@azure/storage-blob";
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