"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Modal } from './base/Modal'
import { Input } from './base/Input'
import { useEditTaskModal } from '@/app/hook/useEditTaskModal';
import { SafeTask } from '@/app/type'

interface EditModalProps{
  curTask?: SafeTask | null
}
export const EditTaskModal : React.FC<EditModalProps>= ({curTask}) => {
  const editTaskModal = useEditTaskModal()
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState(curTask)
  const router = useRouter()

  useCallback(()=>{
    if(!curTask || curTask == null){
      router.push("/")
      toast.error("something went wrong")
    }
    setTask(curTask)
  }, [curTask, router])


  const {handleSubmit, register, formState:{errors}} = 
    useForm<FieldValues>({
      defaultValues:{
        title:curTask?.title,
        detail:curTask?.detail,
        status: curTask?.status
      }
    })
  
  const onSubmit : SubmitHandler<FieldValues> = (data)=>{
    setLoading(true)
    axios.put(`/api/editTask/${curTask?.id}`, data)
    .then(()=>{
      editTaskModal.onClose()
      toast.success("item edited succesfully ! ")
    })
    .catch(()=>{
      toast.error("failed to edit this task")
    })
    .finally(()=>{
      setLoading(false)
      router.push("/")
      location.reload()
    })
  }
  const body = (
    <div className='w-4/5 p-4 my-10 rounded-md focus-within:shadow-xl shadow-blue-200 flex flex-col gap-3'>
      <Input id="title" placeholder='' type="text" label='Title: ' required errors={errors} register={register}/>
      <Input id="detail" placeholder='' type="text" label='Detail: ' required errors={errors} register={register}/>
      <Input id="status" placeholder='' type="text" label='Status: ' required errors={errors} register={register}/>
    </div>
  )
  
  return (
    <Modal 
        title="Edit this Task..."
        body={body}
        open={editTaskModal.open}
        onClose={editTaskModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        disabled={loading}
    />
  )
}
