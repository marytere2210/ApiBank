import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const encriptAdapter = {
hash:(password:string)=>{
    console.log("received password ");
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    console.log("hashed password ", hash);
    return hash;
},

compare:(unencrypted: string, encrypted: string)=>{

    return compareSync(unencrypted, encrypted);
 }
}