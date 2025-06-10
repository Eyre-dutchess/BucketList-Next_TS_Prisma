"use client"

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps{
    id: string
    type?: string
    placeholder?:  string
    label?: string
    modalClass?: boolean
    extraClass?: string
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    required: boolean
}
export const Input: React.FC<InputProps> = ({
    id, type, placeholder, label, modalClass, extraClass, register, errors, required
}) => {
  return (
    <div className={`${modalClass ?"w-full px-2 py-3 border border-blue-800/50 relative focus-within:border-blue-800/5 ":"flex flex-row-reverse items-end justify-start gap-2 hover:shadow-none focus-within:shadow-none"} rounded-lg focus-within:shadow shadow-blue-200/50 text-blue-900/50 font-semibold transition`}>
        <input id={id} type={type} placeholder={placeholder}  {...register(id, {required})}
            className={`${extraClass && extraClass} placeholder:opacity-75 focus:placeholder:opacity-25 bg-transparent outline-none w-full text-blue-800/75
            ${modalClass ?"peer pl-2 focus:pl-2 translate-y-2 focus:translate-y-2 placeholder-shown:translate-y-1":"border-b-2 border-blue-900/50 p-2 pb-0"} `}
        />
        <label className={`${modalClass ?"absolute top-4 left-3 transform origin-[0] transition -translate-y-4 scale-75 opacity-75 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:opacity-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100":""}`} 
            htmlFor={id}>{label}</label>
    </div>
  )
}
