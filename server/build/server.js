"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const AzureBlobController_1 = require("./controller/AzureBlobController");
const Utility_1 = require("./Utility/Utility");
const app = express_1.default();
const port = Utility_1.getEnvironmentVariableValueByKey('PORT') || 8081;
app.use(cors_1.default());
app.use(express_1.default.static(__dirname));
app.use(express_1.default.json());
app.use('/api/fileUplaod', AzureBlobController_1.AzureBlobController);
app.use((err, req, res, next) => {
    console.log(err);
});
app.listen(port, () => console.log('Http server started on port ' + port));
//# sourceMappingURL=server.js.map