"use client"

import React from 'react'

interface ContanierProps{
    children: React.ReactNode
}
export const Container: React.FC<ContanierProps> = ({children}) => {
  return (
    <div className='relative w-screen max-w-[2520px] min-h-[100vh] mx-auto lg:px-[10vw]'>
        {children}
    </div>
  )
}
