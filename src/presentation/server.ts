import express,{ Router } from "express";


interface ConfigServer{
    port:number,
    routes:Router;
}

export class Server{
    private readonly app = express();
    private readonly port:number;
    private readonly routes:Router;

    constructor(confserver:ConfigServer){
        this.port = confserver.port;
        this.routes = confserver.routes;
    }

    async star(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        }
        );
    }

}