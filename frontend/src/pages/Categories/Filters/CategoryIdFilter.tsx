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
import {
  CategoryFilters,
  CategoryIdFilter as CategroyIdFilterType,
} from '@/types/category'
import { CheckIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { categoryColumns } from '@/constants/categories/columns'
import { cn } from '@/lib/utils'
import {
  categoryFilterNames,
  defaultCategoryFilters,
} from '@/constants/categories/filters'

interface IdFilterProps {
  setFilters: (filters: Partial<CategoryFilters>) => void
  filters: CategoryFilters
}

const CategoryIdFilter = ({ filters, setFilters }: IdFilterProps) => {
  const onClear = () =>
    setFilters({
      ...filters,
      id: defaultCategoryFilters.id,
    })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          {categoryColumns.id}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Фильтр' />
          <CommandList className='max-h-none'>
            <CommandGroup>
              <CommandLabel>{categoryFilterNames.id.title}</CommandLabel>
              <CommandSeparator className='mb-1' />
              {Object.entries(categoryFilterNames.id.values).map(
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
              )}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup>
              <Button asChild className='w-full'>
                <CommandItem
                  onSelect={onClear}
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

export default CategoryIdFilter
