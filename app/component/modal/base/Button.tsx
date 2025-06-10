"use client"

import React from 'react'
import { IconType } from 'react-icons'

interface BtnProps{
    label?: string
    icon?: IconType
    onClick: ()=> void
    closeBtn?: boolean
    editBtn?:boolean
    delBtn?: boolean
    navBtn?: boolean
    defauBtn?: boolean
    extraClass?: string
    disabled?: boolean
}
export const Button: React.FC<BtnProps> = ({
    label, icon: Icon, onClick, closeBtn, disabled, editBtn, delBtn, navBtn, defauBtn, extraClass
}) => {
  return (
    <button onClick={onClick}
            className={`${extraClass && extraClass}  flex flex-row items-center justify-center gap-2 transition duration-200
            ${closeBtn?"w-[2em] p-2 aspect-square rounded-full absolute top-2 right-2 bg-orange-400 text-white opacity-50 hover:scale-105 hover:opacity-100":""}
            ${editBtn?"w-full aspect-square rounded border border-blue-600/75 text-blue-600/75 hover:bg-blue-600/75 hover:text-white hover:shadow-md ":""}
            ${delBtn?"w-full aspect-square rounded border border-orange-400/75 text-orange-400/75 hover:bg-orange-400/75 hover:text-white hover:shadow-md ":""}
            ${navBtn?"py-2 lg:py-3 rounded-full px-5 lg:px-10 max-w-[300px] bg-blue-200/25 text-blue-200/50 font-semibold outline -outline-offset-2 outline-blue-100/25 hover:outline-none hover:bg-blue-200/75 hover:text-white hover:shadow-md hover:shadow-blue-200/50":""}
            ${defauBtn?"w-4/5 p-2 rounded-lg z-40 lg:py-4 max-w-[300px] bg-blue-100/25 text-blue-700/50 font-semibold hover:bg-blue-400/75 hover:text-white/75 hover:shadow-md hover:shadow-blue-200/50":""}
            ${disabled?"cursor-not-allowed hover:bg-blue-200/75 hover:text-blue-800/50 hover:shadow-none ":"cursor-pointer"}
    `}>
        {label}
        {Icon && <Icon />}
    </button>
  )
}
