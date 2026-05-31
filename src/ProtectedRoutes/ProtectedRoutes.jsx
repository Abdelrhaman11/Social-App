import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../contexts/authContext'

export default function ProtectedRoutes({children}) {

  const {userToken}= useContext(authContext)

  const token = !!userToken
  return (
    <>
    {token? children :  <Navigate to={'/signin'}/>}
    </>
  )
}
