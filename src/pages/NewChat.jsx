import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomShadcnTrigger from '@/components/CustomShadcnTrigger'
import { Button } from '@/components/ui/button'
import { ChevronDown, Share } from "lucide-react"

const NewChat = () => {
    return (
        <div className='bg-neutral-800 flex-1 p-2 text-white flex flex-col'>
            {/* Header */}
            <div className='flex justify-between items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        {/* change the below to something other than button */}
                        <div className='flex gap-1 items-center p-2 rounded-lg hover:bg-neutral-700 opacity-75 text-lg'>
                            ChatGPT
                            <ChevronDown />
                        </div>
                        {/* <CustomShadcnTrigger Icon={ChevronDown} text='ChatGPT' className='w-auto' /> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='ml-6'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className='flex gap-2'>
                    <Button className='rounded-full' variant='secondary'>
                        <Share />
                        Share
                    </Button>
                    <Button className='rounded-full'>
                        F
                    </Button>
                </div>

            </div>
            <div className='sm:mx-20 lg:mx-32 xl:mx-68 mt-8 flex flex-col h-full justify-between'>
                {/* Body */}
                <div className='h-full overflow-y-auto'>
                    {/* User Prompt */}
                    <div className='text-right my-2'>
                        <span className='px-4 py-2 rounded-full bg-neutral-700'>how do i create a mask group in figma</span>
                    </div>
                </div>
                {/* Footer */}
                <div className='text-center h-32'>
                    <textarea
                        type='text'
                        placeholder='Ask anything'
                        className='rounded-xl bg-neutral-700 w-full h-full p-3 focus:outline-0'
                    />
                </div>
            </div>
        </div>
    )
}

export default NewChat