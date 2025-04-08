import "dotenv/config";
import {get} from "env-var";

export const envs ={
    PORT: get("PORT").required().asPortNumber(),
    NODE_ENV: get("NODE_ENV").required().asString(),
    DATABASEUSERNAME: get("DATABASEUSERNAME").required().asString(),
    DATABASEPASSWORD: get("DATABASEPASSWORD").required().asString(),
    DATABASEHOST: get("DATABASEHOST").required().asString(),
    DATABASENAME: get("DATABASENAME").required().asString(),
    DATABASEPORT: get("DATABASEPORT").required().asPortNumber(),
    SECRETKEY: get("SECRETKEY_JWT").required().asString(),
    WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
    MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
    SENDMAIL: get("SENDMAIL").required().asBool(),
    
};
console.log(`Usando el puerto:, ${envs.PORT}`);