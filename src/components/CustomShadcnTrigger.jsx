import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const CustomShadcnTrigger = ({ Icon, text, className, ...props }) => {
  return (
    <Button
      className={cn('h-7 w-7', className)}
      onClick={(event) => {
        onClick?.(event)
      }}
      {...props}
    >
      {text && <span>{text}</span>}
      {Icon && <Icon />}
    </Button>
  )
}

export default CustomShadcnTrigger
