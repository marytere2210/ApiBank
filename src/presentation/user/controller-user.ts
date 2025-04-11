import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dto/user/register_User.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { RegisterUserService } from "./services/register-user-service";
import { LoginUserdto } from "../../domain/dto/user/loginUserdto";
import { envs } from "../../config";
import { LoginUserService } from "./services/login-user-service";



export class ControllerUser{
    constructor (
        private readonly registerUser: RegisterUserService,
        private readonly loginUser: LoginUserService,    
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
          return res.status(error.statusCode).json({message: error.message})
        }
        console.log(error);

  return res.status(500).json({message: 'Internal Server Error'});
  };
  register = (req: Request, res: Response)=> {
    const [error, registerUserDto] = RegisterUserDto.execute(req.body);
    if(error){
      return res.status(422).json({message: error})
        }
    this.registerUser
    .execute(registerUserDto!)
    .then((message) => res.status(201).json(message))
      .catch((err) => this.handleError(err, res));
  };

  validate = (req: Request, res: Response)=> {
    const {token} = req.params;
    this.registerUser
    .validateEmail(token)
    .then(()=> res.send("Email verified successfully"))
    .catch((error) => this.handleError(error, res))
  };

  login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserdto.execute(req.body);
    this.loginUser
      .execute(loginUserDto!)
      .then((data) => {
        res.cookie('token', data.token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user: data.user });
      })
      .catch((error) => this.handleError(error, res));
  };
}