import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
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
import { Dispatch, SetStateAction, useState } from 'react'
import { CategoryFilters } from '@/types'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { categoryColumns } from '@/constants/categories/columns'
import { cn } from '@/lib/utils'
import { defaultCategoryFilters } from '@/constants/categories/filters'

interface ImageFilterProps {
  setFilters: Dispatch<SetStateAction<CategoryFilters>>
  filters: CategoryFilters
}

const ImageFilter = ({ filters, setFilters }: ImageFilterProps) => {
  const [currentFilters, setCurrentFilters] = useState(filters)
  const [counter, setCounter] = useState(0)

  const onClear = () => setFilters(defaultCategoryFilters)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          {categoryColumns.image}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandList>
            <CommandLabel>Наличие</CommandLabel>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem key={'presense'} onSelect={() => {}}>
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    false
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )}
                >
                  <CheckIcon className={cn('h-4 w-4')} />
                </div>
                {/* {option.icon && (
                  <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                )} */}
                <span>{categoryColumns.image}</span>
                {/* {facets?.get(option.value) && ( */}
                <span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
                  {/* {facets.get(option.value)} */}
                </span>
                {/* )} */}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <Button asChild className='w-full'>
                <CommandItem
                  onSelect={() => {}}
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

export default ImageFilter
