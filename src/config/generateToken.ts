import jwt from 'jsonwebtoken';
import { envs } from './envs';
import { CustomError } from '../domain/errors/custom.error';


export class GenerateToken {
    static async generatetoken (payload:any, duration: string = "3h"){
        return new Promise((resolve)=>{
            jwt.sign(payload, envs.SECRETKEY, {expiresIn: duration},(error, token)=>{
                if(error) return CustomError.internalServer('Error generating token');

                resolve( token);
            
                });
        });
    }

    static async verifytoken (token: string){
        return new Promise((resolve)=>{
            jwt.verify(token, envs.SECRETKEY, (error:any, decoded:any)=>{
                if(error) return resolve({error: true, message: error.message})
                resolve(decoded)
            });
        });
    }
}