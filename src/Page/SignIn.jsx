import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { EyeSlashFilledIcon } from '../Components/Password/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../Components/Password/EyeFilledIcon'
import { Alert, Button, Input } from '@heroui/react'
import { loginSchema } from '../Validation/regex'
import { authContext } from '../contexts/authContext'
import { apiServices } from '../services/api';

export default function SignIn() {

  const [isLoading,setIsLoading]=useState(false)
  const [errMsg,setErrMsg]=useState("")

    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => setIsVisible(!isVisible);



      const { setUserToken }= useContext(authContext)
    




  const {handleSubmit , register , formState:{errors}} = useForm({
    resolver:zodResolver(loginSchema),

  })


 async function signIn(loginData) {

  
  setErrMsg("")
  setIsLoading(true);


try{
    const data = await apiServices.signin(loginData)
    apiServices.setToken(data.data.token)
    localStorage.setItem('token', data.data.token)
    setUserToken(data.data.token)
    console.log(data);
  

}catch(error){

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
      variant :"bordered",
      label,
      type,
      isInvalid:!!field,
      errorMessage:field?.message

    }
    
  }


  // return (
  // <form onSubmit={handleSubmit(signIn)} >
        
  //          <div className=' grid gap-4'>
  //       <div className=' grid gap-3 text-center'>

  //           <h1>Welcome Back</h1>

  //           <p>Sign in to continue your journey</p>
            
  //       </div>   



  //           <Input {...register('email')} {...getInputProps("Email" , "email" , errors.email)} /> 


                
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







  //           <Button isLoading={isLoading} type='submit' color='primary'>Sign in</Button>

  //                          <p>U don't have account? <Link to={'/signup'}>SignUp</Link></p>




  //                  {errMsg && <Alert hideIcon color="danger" title={errMsg} variant="faded" classNames={{base:"py-0 capitalize"}} />}      


  //                    </div>    


  //   </form>  )


    return (

  <div className="min-h-screen grid lg:grid-cols-2 bg-white">

    {/* Left Side */}
    <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-white/10 rounded-full bottom-0 right-0"></div>

      <div className="relative z-10">

        <h1 className="text-6xl font-black leading-tight">
          Welcome Back 👋
        </h1>

        <p className="mt-6 text-xl text-white/80 leading-relaxed">
          Connect with friends, share moments,
          and explore your social world.
        </p>

      </div>

    </div>

    {/* Right Side */}
    <div className="flex items-center justify-center px-6 py-10 bg-gray-50">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
            A
          </div>

        </div>

        {/* Header */}
        <div className="text-center mb-8">

          <h2 className="text-4xl font-bold text-gray-800">
            Sign In
          </h2>

          <p className="text-gray-500 mt-2">
            Continue your journey with us
          </p>

        </div>




        {/* Form */}
        <form onSubmit={handleSubmit(signIn)} className="grid gap-5">

          <Input
            {...register('email')}
            {...getInputProps("Email", "email", errors.email)}
            classNames={{
              inputWrapper:
                "h-14 border-2 hover:border-blue-400 focus-within:border-blue-500 rounded-2xl"
            }}
          />

          <Input
            {...register('password')}
            {...getInputProps(
              "Password",
              isVisible ? "text" : "password",
              errors.password
            )}

            endContent={
              <button
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
            className="h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
          >
            Sign In
          </Button>




          {/* Footer */}

          
          <p className="text-center text-gray-600 mt-2">

            Don't have an account?

            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Sign Up
            </Link>

          </p>

        </form>








      </div>

    </div>

  </div>

)

    
}




