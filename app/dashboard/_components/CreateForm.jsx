"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AiChatSession } from '@/configs/AiModel'
import { useUser } from '@clerk/nextjs'
import { JsonForms } from '@/configs/schema'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
  

const PROMPT=" On the basis of description create JSON form in json format with form title, form subheading with form having Form field, form name, placeholder name and form label, field type, field required in json format"
function CreateForm() {
    const [openDialog, setOpenDialog]=useState(false)
    const [userInput, setUserInput]=useState();
    const [loading, setLoading]=useState();
    const {user}=useUser();
    const route=useRouter();

    const onCreateForm=async()=>{
      console.log(userInput);
      setLoading(true)
      const result=await AiChatSession.sendMessage("Description:+userInput+PROMPT")
      console.log(result.response.text());
      if (result.response.text())
        {
          const resp=await db.inset(JsonForms)
          .values({
            jsonform:result.response.text(),
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format("DD/MM/yyyy")
          }).returning({id:JsonForms.id});

          console.log("New Form ID",resp[0].id);
          if(resp[0].id)
          {
            route.push("/edit-form/"+resp[0].id)
          }
          setLoading(false);
        }
        setLoading(false);
    }

  return (
    <div>
        <Button onClick={()=>setOpenDialog(true)} >+ Create Form</Button>
      <Dialog open={openDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new form</DialogTitle>
                    <DialogDescription>
                      <Textarea 
                        className='my-2' 
                        onChange={(event)=>setUserInput(event.target.value)}
                        placeholder="Write description of your form"
                      />
                      <div className='flex gap-2 my-3 justify-end'>
                        <Button 
                          onClick={()=>setOpenDialog(false)}
                          variant="destructive"

                        >
                          Cancel
                        </Button>
                        <Button 
                          disabled={loading}
                          onClick={()=>onCreateForm()}>
                            {loading?
                            <Loader2 className='animate-spin'/>:'Create'
                          }
                          Create
                        </Button>
                      </div>
                        
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateForm
