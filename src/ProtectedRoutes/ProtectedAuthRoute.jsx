import { Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { authContext } from '../contexts/authContext'

export default function ProtectedAuthRoute({children}) {

    const {userToken}= useContext(authContext)
  

    const token = !!userToken
    console.log(token);
    

  return (
    <>
    {token? <Navigate to={'/'}/>: children }
    </>
  )
}
