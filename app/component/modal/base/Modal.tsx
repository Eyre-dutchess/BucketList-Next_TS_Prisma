"use client"

import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import { Button } from './Button'

interface ModalProps{
    open: boolean
    onClose: ()=>void
    onSubmit: ()=> void
    title: string
    body: ReactElement
    footer?: ReactElement
    disabled?: boolean
}
export const Modal: React.FC<ModalProps> = ({
    open, onClose, onSubmit, title, body, footer, disabled
}) => {
    const [showModal, setShowModal] = useState(open)

    useEffect(()=>{
        setShowModal(open)
    }, [open])
    const handleClose = useCallback(()=>{
        setShowModal(false)
        setTimeout(()=>{
            onClose()
        }, 300)
    }, [showModal])

    if(!showModal)return null;
    return (
        <div className='w-screen h-screen fixed top-0 left-0 z-50 bg-zinc-800/75 flex items-center justify-center'>
            <div className='w-4/5 max-w-[600px] py-8 flex flex-col items-center justify-center gap-2 bg-white relative rounded-md shadow shadow-blue-200'>
                <Button closeBtn icon={FaTimes} onClick={handleClose} />
                <h3 className='w-full text-center pt-6 pb-2 border-b-2 border-blue-900/50 text-xl text-blue-900/75 font-semibold capitalize '>{title}</h3>
                {body}
                {footer}
                <Button defauBtn onClick={onSubmit} disabled={disabled} label='Confirm' extraClass='border-2 border-blue-800/25 hover:border-none' />
            </div>
        </div>
     )
    }
