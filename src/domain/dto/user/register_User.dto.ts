export class RegisterUserDto {
    constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static execute(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = object;

        if (!name) return ["Name is required"];
        if (!email) return ["Email is required"];
        if (!email.includes("@")) return ["Email is invalid"];
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return ["Email is invalid"];
        
        if (!password) return ["Password is required"];
        
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        if (!passwordRegex.test(password)) return ["Password is invalid"];
        
        return [undefined, new RegisterUserDto(name, email, password)];
    }
}