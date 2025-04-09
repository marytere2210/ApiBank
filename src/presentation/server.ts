import express,{ Router } from "express";
import path from "path";


interface ConfigServer{
    port:number,
    routes:Router;
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


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