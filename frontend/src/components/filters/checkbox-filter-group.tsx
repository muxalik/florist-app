import {
  CommandGroup,
  CommandItem,
  CommandLabel,
  CommandSeparator,
} from '../ui/command'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'

interface CheckboxFilterGroupProps {
  id: string | number
  title: string
  options: {
    value: string
    name: string
  }[]
  selected: string[]
  onSelect: (value: string) => void
}

const CheckboxFilterGroup = ({
  id,
  title,
  options,
  selected,
  onSelect,
}: CheckboxFilterGroupProps) => {
  return (
    <CommandGroup key={id}>
      <CommandLabel>{title}</CommandLabel>
      <CommandSeparator className='mb-1' />
      {options.map(({ value, name }) => (
        <CommandItem key={value} onSelect={() => onSelect(value)}>
          <div
            className={cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
              selected.includes(value)
                ? 'bg-primary text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible'
            )}
          >
            <CheckIcon className={cn('h-4 w-4 dark:text-foreground')} />
          </div>
          <span>{name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export default CheckboxFilterGroup
