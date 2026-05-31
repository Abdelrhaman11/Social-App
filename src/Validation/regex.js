   import * as zod from "zod";
   import { calcAge } from "../helpers/date";
   
   
   export const regex = {
      emailRegex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      passwordRegex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

   }


   export const signUpSchema = zod.object({
     name:zod.string().nonempty("Name is required").min(3, "Name must be at least 2 characters").max(20,"Name must be at most 20 characters"),
     email:zod.string().nonempty("Email is required").regex(regex.emailRegex,"Enter valid Email"),
     password:zod.string().nonempty("Password is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
     rePassword:zod.string().nonempty("rePasseord is required"),
     dateOfBirth:zod.string().nonempty("Birth day is required").refine((date)=> calcAge(date) >= 18 , "Age must be at least 15 years old"),
     gender:zod.string().nonempty("Gender is reqiured").regex(/^(male|female)$/ , "Gender must be either male or female")
   }).refine((data)=> data.password === data.rePassword, {
     message:"Password don't match",
     path:["rePassword"]
   })


   export const loginSchema=zod.object({
     email:zod.string().nonempty("Email is required").regex(regex.emailRegex,"Enter valid Email"),
     password:zod.string().nonempty("Password is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
   
   })

   export const changePasswordSchema=zod.object({
      password:zod.string().nonempty("Password is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
      newPassword:zod.string().nonempty("rePassword is required").regex(regex.passwordRegex,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
   })

