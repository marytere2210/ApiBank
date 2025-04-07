import { envs } from "./config/envs";
import { PostgresDatabase } from "./data/postgres/postgres_database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

async function main(){
 const postgres = new PostgresDatabase({
    username: envs.DATABASEUSERNAME,
    password: envs.DATABASEPASSWORD,
    host: envs.DATABASEHOST,
    port:envs.DATABASEPORT,
    database: envs.DATABASENAME,

 });

await postgres.connect();
const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
});
 await server.star();
} 
main();
