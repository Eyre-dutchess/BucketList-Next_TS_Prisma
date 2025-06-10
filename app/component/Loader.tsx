"use client"

import React from 'react'
import { MoonLoader } from 'react-spinners'

export const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col items-center justify-center '>
        <MoonLoader size={100} color="orange"/>
    </div>
  )
}
