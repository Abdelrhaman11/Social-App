import React, { useContext, useState } from "react"
import { Input, Button, Alert } from "@heroui/react"
import { EyeFilledIcon } from "../Components/Password/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../Components/Password/EyeSlashFilledIcon"
import { authContext } from "../contexts/authContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePasswordSchema } from "../Validation/regex"
import { apiServices } from "../services/api"
import { useNavigate } from "react-router-dom"


export default function ChangePassword() {


   const [isLoading,setIsLoading]=useState(false)
    const [errMsg,setErrMsg]=useState("")
    const [successMsg,setSuccessMsg]=useState("")
  
      const [isVisible, setIsVisible] = useState(false);
    
      const toggleVisibility = () => setIsVisible(!isVisible);


      const { setUserToken }= useContext(authContext)
  
      
  
  
    const {handleSubmit , register , reset , formState:{errors}} = useForm({
      resolver:zodResolver(changePasswordSchema)
    })
  
  
   async function changePassword(changePasswordData) {
  
    setSuccessMsg("")
    setErrMsg("")
    setIsLoading(true);
  
  
  try{
      const data = await apiServices.changePassword(changePasswordData)
      console.log(data);
      setUserToken(data.data.token)
      localStorage.setItem("token", data.data.token)
      apiServices.setToken(data.data.token)

    setSuccessMsg(data.message)
    

    reset()
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500">
            Enter your current password and new password
          </p>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit(changePassword)} className="grid gap-5">
        {/* Old Password */}
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

          {/* new Password */}
          <Input
            {...register('newPassword')}
            {...getInputProps(
              "New Password",
              isVisible ? "text" : "password",
              errors.newPassword
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

             {
             successMsg && (
                        <Alert
                          hideIcon
                          color="success"
                          title={successMsg}
                          variant="flat"
                          classNames={{
                            base: "rounded-2xl"
                          }}
                        />

                    )

                
             }


        {/* Submit Button */}
        <Button
          color="primary"
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          Update Password
        </Button>

        </form>

      </div>
    </div>
  )
}
