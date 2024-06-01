"use client"
import { JsonForms } from '@/configs/schema'
import React from 'react'

function EditForm() {

  const GetFormData=async()=>{
    const result=await db.select().from(JsonForms)
    .where()
  }
  return (
    <div>
      EditForm
    </div>
  )
}

export default EditForm
