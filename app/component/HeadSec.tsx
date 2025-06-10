"use client"

import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FaArrowRightLong } from 'react-icons/fa6'

import { useAddnewModal } from '../hook/useAddnewModal'
import { useLoginModal } from '../hook/useLoginModal'
import { Button } from './modal/base/Button'
import { SafeUser } from '../type'

interface HeadProps{
  curUser?: SafeUser | null
}
export const HeadSec: React.FC<HeadProps> = (curUser) => {
  const addnewModal = useAddnewModal()
  const loginModal = useLoginModal()
  return (
    <div className='absolute top-0 left-0 w-full h-[60vh] flex flex-col items-center justify-between'>
        <div className='absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-orange-600/75 via-blue-600/75 to-blue-200/25'></div>
        <h1 className='z-10 text-9xl font-bold text-blue-100/25 tracking-tighter'>TODO</h1>
        <div className='absolute z-30 w-full flex items-center justify-center top-60'>
          <Button label='Add New Task' defauBtn disabled={!curUser || curUser== null} icon={FaPlus} onClick={addnewModal.onOpen}/>
        </div>
        {!curUser && (
          <p onClick={loginModal.onOpen} className='px-4 rounded-full cursor-pointer hover:text-white hover:shadow-lg -translate-y-28 text-lg font-semibold text-blue-900 z-30 flex flex-row items-center justify-center gap-3'>Login first <FaArrowRightLong/></p>
        )}
    </div>
  )
}
