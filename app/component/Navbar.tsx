"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

import { useRegisterModal } from '../hook/useRegisterModal'
import { SafeUser } from '../type'
import { Button } from './modal/base/Button'

interface NavProps{
  curUser?: SafeUser | null
}
export const Navbar: React.FC<NavProps> = ({curUser}) => {
  const registerModal = useRegisterModal()
  const [show, setShow] = useState(false)
  useEffect(()=>{
    setShow(false)
  }, [])
  const toggleShow = useCallback(()=>{
    setShow(value=> !value)
  }, [show])
  return (
    <div className='absolute top-0 left-0 z-40 w-full py-3 lg:py-5 flex items-center justify-end px-[5vw]'>
      {curUser ?(
        <Button navBtn onClick={toggleShow} label={`Hi, ${curUser.name}`} extraClass={`${curUser && "bg-blue-200/75 text-blue-600/50"}`} />
      ):(
        <Button navBtn onClick={registerModal.onOpen} label='Register/Login' />
      )}
      {show &&
        <p onClick={()=>signOut()} className='cursor-pointer absolute top-16 right-10 px-2 py-4 rounded-md bg-blue-200/75 text-blue-600/50  hover:bg-blue-200/75 hover:text-white hover:shadow-md hover:shadow-blue-200/50"'>Sign out</p>}
    </div>
  )
}
