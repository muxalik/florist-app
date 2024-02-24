import { cn } from '@/lib/utils'
import {
  CommandGroup,
  CommandItem,
  CommandLabel,
  CommandSeparator,
} from '../ui/command'
import { CheckIcon } from '@radix-ui/react-icons'

interface RadioFilterGroupProps {
  title: string
  id: string | number
  selected: string
  options: {
    value: string
    name: string
  }[]
  onSelect: (value: string) => void
}

const RadioFilterGroup = ({
  id,
  title,
  selected,
  options,
  onSelect,
}: RadioFilterGroupProps) => {
  return (
    <CommandGroup key={id}>
      <CommandLabel>{title}</CommandLabel>
      <CommandSeparator className='mb-1' />
      {options.map((option) => (
        <CommandItem key={option.value} onSelect={() => onSelect(option.value)}>
          <div
            className={cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary',
              selected === option.value
                ? 'text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible'
            )}
          >
            <CheckIcon className={cn('h-4 w-4 text-primary')} />
          </div>
          <span>{option.name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export default RadioFilterGroup
