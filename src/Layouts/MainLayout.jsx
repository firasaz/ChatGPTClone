import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from '../components/AppSidebar'

const MainLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <Outlet />
        </SidebarProvider>
    )
}

export default MainLayout