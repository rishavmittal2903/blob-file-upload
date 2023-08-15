"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadBlobToFile = exports.createAccountSas = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const constant_1 = require("../constant");
const Utility_1 = require("../Utility/Utility");
exports.createAccountSas = async () => {
    const sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(Utility_1.getEnvironmentVariableValueByKey('ACCOUNT_NAME') || '', Utility_1.getEnvironmentVariableValueByKey('ACCOUNT_KEY') || '');
    const sasOptions = {
        services: storage_blob_1.AccountSASServices.parse("btqf").toString(),
        resourceTypes: storage_blob_1.AccountSASResourceTypes.parse("sco").toString(),
        permissions: storage_blob_1.AccountSASPermissions.parse("rwdlacupi"),
        protocol: storage_blob_1.SASProtocol.Https,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + (10 * 60 * 1000)),
    };
    const sasToken = storage_blob_1.generateAccountSASQueryParameters(sasOptions, sharedKeyCredential).toString();
    // prepend sasToken with `?`
    return (sasToken[0] === '?') ? sasToken : `?${sasToken}`;
};
async function streamToText(readable) {
    var e_1, _a;
    readable.setEncoding('utf8');
    let data = '';
    try {
        for (var readable_1 = __asyncValues(readable), readable_1_1; readable_1_1 = await readable_1.next(), !readable_1_1.done;) {
            const chunk = readable_1_1.value;
            data += chunk;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (readable_1_1 && !readable_1_1.done && (_a = readable_1.return)) await _a.call(readable_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return data;
}
exports.downloadBlobToFile = async (blobName) => {
    try {
        const sasToken = await exports.createAccountSas();
        const containerName = Utility_1.getEnvironmentVariableValueByKey('CONTAINER_NAME');
        const serviceUrl = constant_1.blobServiceUrl(sasToken);
        console.log(serviceUrl);
        const blobService = new storage_blob_1.BlobServiceClient(serviceUrl);
        // get Container - full public read access
        const containerClient = blobService.getContainerClient(containerName);
        const blobClient = await containerClient.getBlobClient(blobName);
        const downloadResponse = await blobClient.download();
        const downloaded = await streamToText(downloadResponse.readableStreamBody);
        console.log(`download of ${blobName} success`);
        return 200;
    }
    catch (err) {
        console.log(err);
        return 400;
    }
};
//# sourceMappingURL=AzureBlobProvider.js.map