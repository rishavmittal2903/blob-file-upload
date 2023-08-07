import cors from 'cors';
import Express, { NextFunction } from 'express'
import { AzureBlobController } from './controller/AzureBlobController';
import { getEnvironmentVariableValueByKey } from './Utility/Utility';

const app = Express();
const port = getEnvironmentVariableValueByKey('PORT')|| 8081;
app.use(cors());
app.use(Express.static(__dirname));
app.use(Express.json())
app.use('/api/fileUplaod',AzureBlobController);
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    console.log(err);
  });
  app.listen(port,()=>console.log('Http server started on port '+port))


