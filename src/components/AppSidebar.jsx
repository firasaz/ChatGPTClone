import React, { useContext, useEffect, useState } from 'react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useSidebar } from '@/components/ui/sidebar'
import { Search, SquarePen } from 'lucide-react'
import { SidebarGroupContent, SidebarGroupLabel } from './ui/sidebar'
// import { items } from '@/data/sidebarItems'
import { callApi } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { ChatContext } from '@/context/ChatContext'

const AppSidebar = () => {
  const { open } = useSidebar()
  const [chatsList, setChatsList] = useState([])
  const { setOldChatLayout } = useContext(ChatContext)

  const handleChatSelection = () => {
    setOldChatLayout(true)
  }
  useEffect(() => {
    const fetchChatsList = async () => {
      try {
        const res = await callApi('http://localhost:8000/api/chat/chat-list/')
        const data = await res.json()
        setChatsList(data)
      } catch(err) {
        console.groupCollapsed('custom_errors')
        console.error('Something went wrong', err)
        console.groupEnd()
      }
    }
    fetchChatsList()
  }, [])
  return (
    // <div className='w-64 bg-zinc-900 h-screen text-white p-3'>Sidebar</div>
    <Sidebar collapsible="icon" className="bg-zinc-900 text-white">
      <SidebarHeader className="flex-row justify-between items-center text-white">
        <SidebarTrigger className="text-white" />
        {
          open && (
            <div className='flex'>
              <button className="p-2 opacity-75 hover:bg-neutral-700 rounded-lg">
                <Search className="h-5 w-5" />
              </button>
              <Link to='/' className="p-2 opacity-75 hover:bg-neutral-700 rounded-lg" onClick={() => setOldChatLayout(false)}>
                <SquarePen className="h-5 w-5" />
              </Link>
            </div>
          )
          // <CustomShadcnTrigger Icon={Search} />
        }
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={'text-neutral-400'}>
            Today
          </SidebarGroupLabel>
          <SidebarGroupContent className={'list-none'}>
            {chatsList.map(item => (
              <SidebarMenuItem key={item.title} className={'rounded-md hover:bg-neutral-600'}>
                <SidebarMenuButton asChild>
                  <Link to={`chats/${item.id}`} onClick={handleChatSelection} className='mb-2 py-1'>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
