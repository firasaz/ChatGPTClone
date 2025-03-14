import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const ModelsDropdown = ({ models, model, setModel }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-1 items-center p-2 rounded-lg hover:bg-neutral-700 opacity-75 text-lg">
          {model.name?.toUpperCase()}
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-54 w-80 bg-neutral-700 border-neutral-500 text-white rounded-xl px-1 py-3">
        {models.map(model => (
          <DropdownMenuItem
            key={model.model}
            onClick={() => {
              setModel(model)
            }}
          >
            {/* <div className="bg-neutral-600 p-1 rounded-full">
              <Model.Icon className="text-white" />
            </div> */}
            <div>
              <p>{model.name}</p>
              <p className="text-xs opacity-75">{model.details.family}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModelsDropdown
