import { addToast, Alert, Button, Input, Select, SelectItem } from '@heroui/react'
import React, { useState } from 'react'
import { EyeSlashFilledIcon } from '../Components/Password/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../Components/Password/EyeFilledIcon';
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom';
import { signUpSchema } from '../Validation/regex';
import { apiServices } from '../services/api';


export default function Signup() {





const [isLoading,setIsLoading]=useState(false)
const [errMsg,setErrMsg]=useState("")
const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);






  const { handleSubmit, register , formState:{errors} } = useForm({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      name:"abdo",
      email:"abdo@gmail.com",
      password:"123asd123ASD@",
      rePassword:"123asd123ASD@",
      dateOfBirth:"2001-07-12",
      gender:"male"
    }
  })




async function signUp(registerData){
  // console.log(registerData);
  
  setErrMsg("")
  setIsLoading(true);


try{
    const  data  = await apiServices.signup(registerData)
    addToast({
              title: "Success",
              description: "Account created Success",
              color: "success",
            })
    console.log(data);
    navigate("/signin")
  

} catch(error){



    if (error.response) {

      setErrMsg(error.response.data.message);

    } else {

      setErrMsg(error.message);

    }
  

}finally{
    setIsLoading(false);

}
  
}

function getInputProps(label,type,field) {

    return {
        variant : 'bordered',
        label,
        type,
        isInvalid: !!field,
        errorMessage: field?.message
        // isRequired:true
    }
    
}


  // return (

  //   <form onSubmit={handleSubmit(signUp)}>
        
  //       <div className=' grid gap-4'>
  //       <div className=' grid gap-3 text-center'>

  //           <h1>Join Us Today</h1>

  //           <p>Create your account and start connecting</p>
            
  //       </div>   

  //           <Input {...register('name')} {...getInputProps("Full Name" , "text" , errors.name)} /> 


  //           <Input {...register('email')} {...getInputProps("Email" , "email" , errors.email)} /> 


  //           {/* <Input isInvalid={!!errors.password} errorMessage={errors.password?.message}  {...register('password',getFormValidation(watch).password)}  variant='bordered' label="password" type={isVisible ? "text" : "password"}  endContent={
  //                   <button
  //                     aria-label="toggle password visibility"
  //                     className="focus:outline-solid outline-transparent"
  //                     type="button"
  //                     onClick={toggleVisibility}
  //                   >
  //                     {isVisible ? (
  //                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
  //                     ) : (
  //                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
  //                     )}
  //                   </button>
  //                 }   />  */}
  //           <Input {...register('password')} {...getInputProps("Password" , isVisible ? "text" : "password" , errors.password)} endContent={
  //                   <button
  //                     aria-label="toggle password visibility"
  //                     className="focus:outline-solid outline-transparent"
  //                     type="button"
  //                     onClick={toggleVisibility}
  //                   >
  //                     {isVisible ? (
  //                       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
  //                     ) : (
  //                       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
  //                     )}
  //                   </button>
  //                 }   /> 


  //           <Input {...register('rePassword')} {...getInputProps("Password" , isVisible ? "text" : "password" , errors.rePassword)}  /> 


  //           <Input {...register('dateOfBirth')} {...getInputProps("Birth Date" , "date" , errors.dateOfBirth)} /> 


  //           <Select {...register('gender')} {...getInputProps("Gender" , undefined ,errors.gender )}>
                 
  //                   <SelectItem key='male'>male</SelectItem>
  //                   <SelectItem key='female'>female</SelectItem>
                    
  //           </Select>

  //           <Button isLoading={isLoading} type='submit' color='primary'>Sign up</Button>
  //               <p>Already have an account? <Link to={'/signin'}>Login now</Link></p>


  //           {errMsg && <Alert hideIcon color="danger" title={errMsg} variant="faded" classNames={{base:"py-0 capitalize"}} />}      


  //     </div>   


  //   </form>
  // )


  return (

  <div className="min-h-screen grid lg:grid-cols-2 bg-white">

    {/* Left Side */}
    <div className="hidden lg:flex items-center min-h-screen justify-center px-20 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white relative overflow-hidden">

      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-white/10 rounded-full bottom-0 right-0"></div>

      <div className="relative z-10">

        <h1 className="text-6xl  leading-tight">
          Join Our Community 🚀
        </h1>

        <p className="mt-6 text-xl text-white/80 leading-relaxed">
          Create your account and start sharing
          your moments with the world.
        </p>

      </div>

    </div>

    {/* Right Side */}
    <div className="flex items-center justify-center px-6 py-10 bg-gray-50">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
            A
          </div>

        </div>

        {/* Header */}
        <div className="text-center mb-8">

          <h2 className="text-4xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Start your journey with us today
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(signUp)} className="grid gap-5">

          {/* Name */}
          <Input
            {...register('name')}
            {...getInputProps("Full Name", "text", errors.name)}
            classNames={{
              inputWrapper:
                "h-14 border-2 hover:border-blue-400 focus-within:border-blue-500 rounded-2xl"
            }}
          />

          {/* Email */}
          <Input
            {...register('email')}
            {...getInputProps("Email", "email", errors.email)}
            classNames={{
              inputWrapper:
                "h-14 border-2 hover:border-blue-400 focus-within:border-blue-500 rounded-2xl"
            }}
          />

          {/* Password */}
          <Input
            {...register('password')}
            {...getInputProps(
              "Password",
              isVisible ? "text" : "password",
              errors.password
            )}

            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {
                  isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400" />
                  )
                }
              </button>
            }

            classNames={{
              inputWrapper:
                "h-14 border-2 hover:border-blue-400 focus-within:border-blue-500 rounded-2xl"
            }}
          />

          {/* Confirm Password */}
          <Input
            {...register('rePassword')}
            {...getInputProps(
              "Confirm Password",
              isVisible ? "text" : "password",
              errors.rePassword
            )}

            classNames={{
              inputWrapper:
                "h-14 border-2 hover:border-blue-400 focus-within:border-blue-500 rounded-2xl"
            }}
          />

          {/* Birth Date */}
          <Input
            {...register('dateOfBirth')}
            {...getInputProps(
              "Birth Date",
              "date",
              errors.dateOfBirth
            )}

            classNames={{
              inputWrapper:
                "h-14 border-2 hover:border-blue-400 focus-within:border-blue-500 rounded-2xl"
            }}
          />

          {/* Gender */}
          <Select
            {...register('gender')}
            {...getInputProps(
              "Gender",
              undefined,
              errors.gender
            )}

            classNames={{
              trigger:
                "h-14 border-2 hover:border-blue-400 focus-within:border-blue-500 rounded-2xl"
            }}
          >

            <SelectItem key="male">
              Male
            </SelectItem>

            <SelectItem key="female">
              Female
            </SelectItem>

          </Select>

          {/* Error */}
          {
            errMsg && (
              <Alert
                hideIcon
                color="danger"
                title={errMsg}
                variant="flat"
                classNames={{
                  base: "rounded-2xl"
                }}
              />
            )
          }

          {/* Button */}
          <Button
            isLoading={isLoading}
            type="submit"
            className="h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg"
          >
            Sign Up
          </Button>



          {/* Footer */}
          <p className="text-center text-gray-600 mt-2">

            Already have an account?

            <Link
              to="/signin"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login now
            </Link>

          </p>

        </form>

      </div>

    </div>

  </div>

)



}


