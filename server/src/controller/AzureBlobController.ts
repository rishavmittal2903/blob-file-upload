import { Router, Request, Response, NextFunction } from "express";
import {
  createAccountSas,
  downloadBlobToFile,
} from "../Provider/AzureBlobProvider";

export const AzureBlobController = Router();

AzureBlobController.get(
  "/getSaSToken",
  async (request: Request, response: Response, next: NextFunction) => {
    const sasToken = await createAccountSas();
    response.send(sasToken);
  }
);
AzureBlobController.get(
  "/download/:blobName",
  async (request: Request, response: Response, next: NextFunction) => {
    const blobName = request.params["blobName"];
    if (blobName) {
      const status = await downloadBlobToFile(blobName);
      response.send(status);;
    }
    response.sendStatus(400);
  }
);
