"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureBlobController = void 0;
const express_1 = require("express");
const AzureBlobProvider_1 = require("../Provider/AzureBlobProvider");
exports.AzureBlobController = express_1.Router();
exports.AzureBlobController.get("/getSaSToken", async (request, response, next) => {
    const sasToken = await AzureBlobProvider_1.createAccountSas();
    response.send(sasToken);
});
exports.AzureBlobController.get("/download/:blobName", async (request, response, next) => {
    const blobName = request.params["blobName"];
    if (blobName) {
        const status = await AzureBlobProvider_1.downloadBlobToFile(blobName);
        response.sendStatus(status);
        ;
    }
    response.sendStatus(400);
});
//# sourceMappingURL=AzureBlobController.js.map