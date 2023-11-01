import React from 'react'
import NavbarMenu from './NavbarMenu'
import { Outlet } from 'react-router-dom'



function MainMenu() {
  return (
   
    <>
      <NavbarMenu />
      <Outlet />
    </>
   
  )
}

export default MainMenu
