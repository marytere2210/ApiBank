export class LoginUserdto{
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}

    static execute(object: { [key: string]: any }): [string?, LoginUserdto?] {
        const { email, password } = object;

if(!email) return ["Email is required"];
if(!email.includes("@")) return ["Email is invalid"];
if(!password) return ["Password is required"];
return [undefined, new LoginUserdto(email, password)];
    }

    

}