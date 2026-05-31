import { createContext, useEffect, useState } from "react";
import { get } from "react-hook-form";
import { apiServices } from "../services/api";





export const authContext = createContext(0)

export default function AuthContextProvider({ children }) {
    const [isLoading,setIsLoading]=useState(false)
    const [userData,setUserData]=useState(false)
    const [userToken , setUserToken] = useState(localStorage.getItem("token"))


async function getLoggedUserData() {
    setIsLoading(true)
    try {
        const {data} = await apiServices.getloggedUserData()
        
        setUserData(data.user)

    } catch (error) {
        if(error.status == 401){
            localStorage.removeItem("token")
            setUserData(null)

        }
    }finally{
        setIsLoading(false)
    }
    
}

useEffect(()=>{

    if(userToken != null)
    {
        apiServices.setToken(userToken)
        getLoggedUserData()
    }
},[userToken])
    

    return <authContext.Provider value={{userToken , setUserToken , setUserData  , userData , isLoading}}>
        {children}
    </authContext.Provider>
    
}