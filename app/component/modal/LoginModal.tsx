"use client"

import React, { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Modal } from './base/Modal'
import { Input } from './base/Input'
import { Button } from './base/Button'
import { useRegisterModal } from '@/app/hook/useRegisterModal'
import { useLoginModal } from '@/app/hook/useLoginModal'

export const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toggle = useCallback(()=>{
    registerModal.onOpen()
    loginModal.onClose()
  }, [loginModal, registerModal])

  const {handleSubmit, register, formState:{errors}}= 
    useForm<FieldValues>({
      defaultValues:{
        name:"",
        email:"",
        password:""
      }
    })

  const onSubmit:SubmitHandler<FieldValues> = (data)=>{
    setLoading(true)
    signIn("credentials", {
      ...data,
      redirect: false
    })
    .then((callback)=>{
      if(callback?.ok){
        loginModal.onClose()
        toast.success("log into your account successfully")
      }
      if(callback?.error){
        toast.error("log in failed")
      }
    })
    .finally(()=>{
      setLoading(false)
      router.refresh()
    })
  
  }
  const body = (
    <div className='w-full py-4 flex  flex-col items-center justify-center gap-3'>
        <div className='w-4/5 py-4 flex  flex-col gap-2'>
          <Input register={register} required errors={errors} id="email" modalClass type='text' placeholder='e.g. John@gmail.com' label="Email: " extraClass='placeholder-shown:pl-16'/>
          <Input register={register} required errors={errors} id="password" modalClass type='password' placeholder='******' label="Password: " extraClass='placeholder-shown:pl-24'/>
        </div>
        <p className='w-full h-[2px] bg-blue-200/75 flex items-center justify-center text-blue-200'>or</p>
        
    </div>
  )
  const footer = (
    <p className='w-full text-center italic text-blue-400/50'>Don't have an account yet? 
      <span onClick={toggle} className='cursor-pointer hover:font-bold hover:not-italic hover:text-blue-800/75 transition'> Register </span> now
    </p>
  )
  return (
    <Modal 
      title="Welcome back! Log into your account!"
      body={body}
      footer={footer}
      open={loginModal.open}
      onClose = {loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={loading}
    />
  )
}
