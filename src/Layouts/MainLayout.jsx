import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '../components/AppSidebar'
import { ChatProvider } from '@/context/ChatContext'

const MainLayout = () => {
  return (
    <ChatProvider>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </ChatProvider>
  )
}

export default MainLayout
