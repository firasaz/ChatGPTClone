import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { capitalizeModelName } from '@/lib/utils'
import classNames from 'classnames'

const ModelsDropdown = ({ models, selectedModel, setModel }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <div className="flex gap-1 items-center p-2 rounded-lg hover:bg-neutral-700 opacity-75 text-lg font-medium">
          {capitalizeModelName(selectedModel.name)}
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className="w-80 bg-neutral-700 border-neutral-500 text-white rounded-xl px-1 py-3 mt-1">
        {models.map(model => (
          <DropdownMenuItem
            key={model.model}
            onClick={() => {
              setModel(model)
            }}
            className={classNames('hover:bg-neutral-600 py-2', selectedModel.model === model.model ? 'bg-neutral-600' : '')}
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
