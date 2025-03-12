import React from 'react'
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
import { items } from '@/data/sidebarItems'

const AppSidebar = () => {
  const { open } = useSidebar()
  return (
    // <div className='w-64 bg-zinc-900 h-screen text-white p-3'>Sidebar</div>
    <Sidebar collapsible="icon" className="bg-zinc-900 text-white">
      <SidebarHeader className="flex-row justify-between items-center text-white">
        <SidebarTrigger className="text-white" />
        {
          open && (
            <div>
              <button className="p-2 opacity-75 hover:bg-neutral-700 rounded-lg">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 opacity-75 hover:bg-neutral-700 rounded-lg">
                <SquarePen className="h-5 w-5" />
              </button>
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
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
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
