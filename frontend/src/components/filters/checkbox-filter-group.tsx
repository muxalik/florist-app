import { CommandGroup, CommandSeparator } from 'cmdk'
import { CommandItem, CommandLabel } from '../ui/command'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'

interface CheckboxFilterGroupProps {
  title: string
  options: {
    key: string
    name: string
  }[]
  selected: string[]
  onSelect: (key: string) => void
}

const CheckboxFilterGroup = ({
  title,
  options,
  selected,
  onSelect,
}: CheckboxFilterGroupProps) => {
  return (
    <CommandGroup>
      <CommandLabel>{title}</CommandLabel>
      <CommandSeparator className='mb-1' />
      {options.map(({ key, name }) => (
        <CommandItem key={key} onSelect={() => onSelect(key)}>
          <div
            className={cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
              selected.includes(key)
                ? 'bg-primary text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible'
            )}
          >
            <CheckIcon className={cn('h-4 w-4')} />
          </div>
          <span>{name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export default CheckboxFilterGroup
