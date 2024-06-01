import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'

function page() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl flex items-center justify-between'>
        Dashboard
        <CreateForm />
      </h2>
    </div>
  )
}

export default page
