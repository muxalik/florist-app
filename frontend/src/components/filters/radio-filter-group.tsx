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
  selected: string
  options: {
    key: string
    name: string
  }[]
  onSelect: (key: string) => void
}

const RadioFilterGroup = ({
  title,
  selected,
  options,
  onSelect,
}: RadioFilterGroupProps) => {
  return (
    <CommandGroup>
      <CommandLabel>{title}</CommandLabel>
      <CommandSeparator className='mb-1' />
      {options.map(({ key, name }) => (
        <CommandItem key={key} onSelect={() => onSelect(key)}>
          <div
            className={cn(
              'mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary',
              selected === key
                ? 'text-primary-foreground'
                : 'opacity-50 [&_svg]:invisible'
            )}
          >
            <CheckIcon className={cn('h-4 w-4 text-primary')} />
          </div>
          <span>{name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export default RadioFilterGroup
