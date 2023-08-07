import { Router, Request, Response, NextFunction } from "express"
import { createAccountSas } from "../Provider/AzureBlobProvider";

export const AzureBlobController = Router();

AzureBlobController.get('/getSaSToken', async(request: Request, response: Response,next:NextFunction) => {

    const sasToken = await createAccountSas()
    response.send(sasToken);
});
