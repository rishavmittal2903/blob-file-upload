"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobServiceUrl = exports.containerName = exports.storageAccountName = void 0;
const Utility_1 = require("./Utility/Utility");
exports.storageAccountName = Utility_1.getEnvironmentVariableValueByKey('ACCOUNT_NAME') || '';
exports.containerName = Utility_1.getEnvironmentVariableValueByKey('CONTAINER_NAME') || '';
exports.blobServiceUrl = (sasToken) => `https://${exports.storageAccountName}.blob.core.windows.net/?${sasToken}`;
//# sourceMappingURL=constant.js.map