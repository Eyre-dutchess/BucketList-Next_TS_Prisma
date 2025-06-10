"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Modal } from './base/Modal'
import { Input } from './base/Input'
import { useAddnewModal } from '@/app/hook/useAddnewModal'

export const AddnewModal = () => {
  const addnewModal = useAddnewModal()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const {handleSubmit, register, formState:{errors}} = 
    useForm<FieldValues>({
      defaultValues:{
        title:"",
        detail:"",
        status: "false"
      }
    })
  
  const onSubmit : SubmitHandler<FieldValues> = (data)=>{
    setLoading(true)
    axios.post("/api/addnew", data)
    .then(()=>{
      addnewModal.onClose()
      toast.success("a new item added ! ")
    })
    .catch(()=>{
      toast.error("failed to create a new task")
    })
    .finally(()=>{
      setLoading(false)
      router.refresh()
    })
  }
  const body = (
    <div className='w-4/5 p-4 my-10 rounded-md focus-within:shadow-xl shadow-blue-200 flex flex-col gap-3'>
      <Input id="title" placeholder='' type="text" label='Title' required errors={errors} register={register}/>
      <Input id="detail" placeholder='' type="text" label='Detail' required errors={errors} register={register}/>
      <Input id="status" placeholder='' type="text" label='Status' required errors={errors} register={register}/>
    </div>
  )
  
  return (
    <Modal 
        title="Add a new Task"
        body={body}
        open={addnewModal.open}
        onClose={addnewModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        disabled={loading}
    />
  )
}
