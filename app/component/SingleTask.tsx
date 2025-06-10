"use client"

import React, { useEffect, useState } from 'react'
import { SafeTask } from '../type'
import { Button } from './modal/base/Button'
import { FaEdit, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useEditTaskModal } from '../hook/useEditTaskModal'

interface TaskProps{
  task?: SafeTask 
}
export const SingleTask: React.FC<TaskProps> = ({task}) => {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const editTaskModal = useEditTaskModal()

  useEffect(()=>{
    setShow(false)
  }, [])
 
  const handleDel = (id: string) =>{
    axios.delete(`/api/editTask/${id}`)
    .then(()=>{
      toast.success("item deleted!")
      router.refresh()
    })
    .catch(()=>{
      toast.error("can't delete this item")
    })
  }
  const handleEdit = (id: string) =>{
    editTaskModal.onOpen()
    router.push(`/task/${id}`)
  }
  if(!task)return null
  return (
    <div className='w-full px-4 rounded-lg cursor-pointer hover:shadow-md bg-white/25 hover:bg-white/50 py-1 flex flex-row items-center justify-between'>
      
      <div className='w-auto relative text-blue-900/75'>
        <h6 onMouseOver={()=> setShow(true)} 
            onMouseOut={()=>setShow(false)}>
              {task.title}
        </h6>
        <p className={` ${show ?"scale-100":"scale-0"} whitespace-nowrap transition absolute -top-8 -right-16 text-xs bg-blue-600 text-white rounded-md shadow-blue-200 p-2`}>
        {task.detail}</p>
      </div>
      <div className='w-[5em] px-[0.5em] flex flex-row items-end justify-end gap-2'>
        <Button icon={FaEdit} editBtn onClick={()=>handleEdit(task.id)}/>
        <Button icon={FaTrash} delBtn onClick={()=>handleDel(task.id)}/>
      </div>
      
      
    </div>
  )
}
