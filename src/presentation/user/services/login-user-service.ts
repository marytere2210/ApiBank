
import { CustomError } from "../../../domain/errors/custom.error";
import { GenerateTokenforUser } from "../../../config/generateTokenUser";
import { envs } from "../../../config";
import { User, UserRole } from "../../../data/postgres/models/user-models";
import { encriptAdapter } from "../../../config/encriptpassword";
import { LoginUserdto } from "../../../domain/dto/user/loginUserdto";



export class LoginUserService{
    async execute(credential: LoginUserdto){
      
      //1 
      const user = await this.verifyUserExistence(credential.email);

      //2
      this.verifyPasswordIsCorrect(credential.password,user!.password_user);

      //3
      const token = await this.generateToken({id: user!.id_user}, envs.EXPIREINJWT);
 
 //4 devolver token
      return {token, user:{
  id:user?.id_user,
  name:user?.name_user,
  email:user?.email_user,
  status:user?.status_user,
  password : user?.password_user
  } 
 }
}
//1 verificar que el usuario existe
    private verifyUserExistence(email: string){

  const user = User.findOne({
    where: {
      email_user: email,
      status_user: UserRole.ACTIVE,
    },
  });

  if(!user){
    throw CustomError.notFound('User not found');
  }
  return user;
  }

// 2 verifica que la contraseña sea correcta
  private verifyPasswordIsCorrect(unencrypted: string,encrypted: string){
    const isCorrect = encriptAdapter.compare(unencrypted,encrypted);
    if(!isCorrect){
      throw CustomError.unAuthorized('Credentials is incorrect');
    }
  }

  //3 generar un token

 private async generateToken(payload: any, duration:string){
  const token = await GenerateTokenforUser.generatetoken(payload, duration);

  if(!token) throw CustomError.internalServer('Error generating token');

  return token;
  
 }

}