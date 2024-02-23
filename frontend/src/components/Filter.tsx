import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandLabel,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CheckIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Filter as FilterType } from '@/types'

interface FilterProps {
  label: string
  accessKey: string
  filters: FilterType[]
  setFilters: (filters: Partial<CategoryFilters>) => void
  clear: () => void
}

export function Filter({
  label,
  accessKey,
  filters,
  setFilters,
  clear,
}: FilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Фильтр' />
          <CommandList className='max-h-none'>
            {filters.map((filter: FilterType) => (
              <CommandGroup>
                <CommandLabel>{filter.title}</CommandLabel>
                <CommandSeparator className='mb-1' />
                {filter.type === 'checkbox' && ''}
              </CommandGroup>
            ))}
            {/* {Object.entries(categoryFilterNames.id.values).map(
              ([key, value]) => {
                const castedKey = key as CategroyIdFilterType

                return (
                  <CommandItem
                    key={castedKey}
                    onSelect={() =>
                      setFilters({
                        id: castedKey,
                      })
                    }
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary',
                        filters.id.includes(castedKey)
                          ? 'text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4 text-primary')} />
                    </div>
                    <span>{value}</span>
                  </CommandItem>
                )
              }
            )} */}

            <CommandSeparator />

            <CommandGroup>
              <Button asChild className='w-full'>
                <CommandItem
                  onSelect={clear}
                  className='justify-center text-center'
                >
                  Очистить
                </CommandItem>
              </Button>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Filter
