import { DataSource } from "typeorm";
import { Account } from "./models/account-models";
import { Transaction } from "./models/transaction-models";
import { User } from "./models/user-models";

interface PostgresDatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export class PostgresDatabase  {
    public datasource: DataSource;

    constructor(config: PostgresDatabaseConfig) {
        this.datasource = new DataSource({
            type: "postgres",
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database,
            synchronize: true, 
            entities: [ User, Account, Transaction ],
            ssl:{
                rejectUnauthorized: false
            },
           
        });
    }

    async connect(){
        try {
            await this.datasource.initialize();
            console.log("Postgres database connected successfully.");
        } catch (error) {
            console.log("Error connecting to Postgres database:", error);
                      
        }
    }

}
