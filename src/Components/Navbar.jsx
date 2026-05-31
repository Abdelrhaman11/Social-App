import React, { useContext } from 'react'
import {Navbar as HeroNavBar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger
  , Dropdown, DropdownMenu,Avatar,} from "@heroui/react";
import {Link} from "react-router-dom"
import { authContext } from '../contexts/authContext';


export default function Navbar() {

  const {userToken , setUserToken , userData  } = useContext(authContext)


  function logOut() {
    localStorage.removeItem("token");
    setUserToken(null)
    setUserData(null)

  }
  return (

    <HeroNavBar isBordered>


        <NavbarBrand className="mr-4">
         <Link to={`/`}> <p className="font-bold text-inherit">ACME  </p></Link>
        </NavbarBrand>

      <NavbarContent as="div" justify="end">

        {userToken?      <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={userData?.name}
              size="sm"
              src={userData?.photo}
              onError={(e)=> e.target.src= undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <Link className='h-14' to={`/users/${userData?._id}/profile`}>
                <p className="font-semibold">Signed in as {userData?.name}</p>
                <p className="font-semibold">{userData?.email}</p>
              </Link>

            </DropdownItem>

            <DropdownItem color="success">
                 <Link className='h-14' to={`users/change-password`}>
                <p>Change Password</p>
              </Link>
            </DropdownItem>



            <DropdownItem onClick={logOut} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :""
        }


      </NavbarContent>

      
    </HeroNavBar>
    
  )
}
