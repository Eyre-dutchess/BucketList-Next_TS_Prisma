"use client"

import React from 'react'
import { SafeTask } from '../type'
import { SingleTask } from './SingleTask'

interface ListProps{
  tasks?: SafeTask[] | null
}
export const ListSec: React.FC<ListProps> = ({tasks}) => {
  if(!tasks || tasks == null || tasks.length < 1){
    return (
      <p className='w-full relative  z-40 text-center text-2xl font-semibold text-orange-400/75'>Empty list!</p>
    )
  }
  return (
    <div className='w-4/5 max-w-[700px] mx-auto relative  z-30 rounded-md bg-white/25 p-2 shadow-lg shadow-blue-200/50 flex flex-col  gap-2'>
      {tasks.map((task)=>{
        return <SingleTask key={task.id} task={task} />
      })}
    </div>
  )
}
