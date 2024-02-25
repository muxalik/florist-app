import { CommandGroup, CommandLabel, CommandSeparator } from '../ui/command'
import { Slider } from '@/components/ui/slider'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { SliderFilterOption, SliderFilter as SliderFilterType } from '@/types'
import { useEffect, useState } from 'react'

interface SliderFilterGroupProps {
  id: string | number
}

const SliderFilterGroup = ({
  id,
  title,
  options,
  onChange,
}: SliderFilterGroupProps & Omit<SliderFilterType, 'type'>) => {
  return (
    <CommandGroup key={id}>
      <CommandLabel>{title}</CommandLabel>
      <CommandSeparator className='mb-1' />
      <ul className='flex flex-col text-sm px-2 py-2 gap-4'>
        {options.map((option, index) => (
          <SliderFilter id={index} option={option} onChange={onChange} />
        ))}
      </ul>
    </CommandGroup>
  )
}

interface SliderFilterProps {
  id: number
  option: SliderFilterOption
  onChange: SliderFilterType['onChange']
}

const SliderFilter = ({ id, option, onChange }: SliderFilterProps) => {
  const [value, setValue] = useState(option.value)

  useEffect(() => {
    setValue(option.value)
  }, [option.value])

  return (
    <li key={id} className='space-y-2'>
      <p className='px-1'>{option.name}</p>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Slider
              min={option.min}
              max={option.max}
              step={1}
              value={[value]}
              onValueChange={(value) => setValue(value[0])}
              onValueCommit={(value) => onChange(option.key, value[0])}
            />
          </TooltipTrigger>
          <TooltipContent
            className='pointer-events-none mb-3 rounded-sm text-secondary'
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            <p>{value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className='flex justify-between items-center px-1 pt-1'>
        <p>{option.min}</p>
        <p>{option.max}</p>
      </div>
    </li>
  )
}

export default SliderFilterGroup
