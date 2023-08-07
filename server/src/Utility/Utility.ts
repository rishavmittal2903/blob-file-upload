import dotenv from 'dotenv'
const config = dotenv.config();
export const getEnvironmentVariableValueByKey=(keyName:string):string=>config.parsed[keyName];