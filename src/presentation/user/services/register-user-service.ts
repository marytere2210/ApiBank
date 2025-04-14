import pug from 'pug';
import path from 'path';
import { envs } from "../../../config";
import { encriptAdapter } from "../../../config/encriptpassword";
import { GenerateTokenforUser } from "../../../config/generateTokenUser";
import { User, UserRole } from "../../../data/postgres/models/user-models";
import { RegisterUserDto } from "../../../domain/dto/user/register_User.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { EmailService } from "../../common/services/email.services";

export class RegisterUserService{

    constructor (private readonly emailService: EmailService){}

    async execute (userData: RegisterUserDto){
        const user = new User();

        user.name_user = userData.name;
        user.email_user = userData.email;
        user.status_user = UserRole.INACTIVE;
        user.password_user = this.encriptPassword(userData.password);

        const userExist = await this.findOneuserEmail(userData.email);
        if(userExist) throw CustomError.badRequest("User already exists");
        

        try {
            await user.save();
            this.sendLinkValidateToken(user.email_user);
            return {
              message: "User created"}
            
        } catch (error) {
            throw CustomError.internalServer("Error creating user");
        }
    }

 private findOneuserEmail =  async(email:string)=>{
    const users = await User.findOne({where: {email_user: email}});
    return users;
  };

  public validateEmail = async (token:string)=>{
    const payload = await GenerateTokenforUser.verifytoken(token);
    if(!payload) throw CustomError.unAuthorized("Invalid token");
    
    const {email} = payload as {email:string};
    if(!email) throw CustomError.notFound("Invalid token");
    
    const user = await this.findOneuserEmail(email);
    if(!user)  throw CustomError.notFound("User not found");
    
    user.status_user = UserRole.ACTIVE;
    try {
        await user.save();
        return {message: "User activated"};
    } catch (error) {
      throw CustomError.internalServer('Error saving user');
        
    }
  }

  private sendLinkValidateToken = async(email:string)=>{
    const token = await GenerateTokenforUser.generatetoken({email}, "300s");
    console.log("generate Token", token);
    if(!token) throw CustomError.internalServer("Error generating token");
    
    const link = `http://${envs.WEBSERVICE_URL}/api/validate/${token}`;
    console.log("link", link);

    const templatePath = path.join(__dirname, "../../views/emailtemplates.pug");
   //console.log(templatePath);

   const html = pug.renderFile(templatePath, { link, email });
    //console.log("Generated HTML:", html);
    if (!html) throw CustomError.internalServer("Error generating email template");
    
   const isSent = await this.emailService.sendEmail({
    to: email,
    subject: 'Validate your email',
    html: html,
  });

if(!isSent) throw CustomError.internalServer("Error sending email");

return {message: "Email sent", error: false};
  };

  private encriptPassword(password:string):string{
  return encriptAdapter.hash(password); 
  }
}