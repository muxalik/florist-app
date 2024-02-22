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
import { Dispatch, SetStateAction } from 'react'
import {
  CategoryFilterFormats,
  CategoryFilterImage,
  CategoryFilters,
} from '@/types/category'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { categoryColumns } from '@/constants/categories/columns'
import { cn } from '@/lib/utils'
import {
  categoryFilterNames,
  defaultCategoryFilters,
} from '@/constants/categories/filters'

interface ImageFilterProps {
  setFilters: Dispatch<SetStateAction<CategoryFilters>>
  filters: CategoryFilters
}

const ImageFilter = ({ filters, setFilters }: ImageFilterProps) => {
  const onClear = () => setFilters(defaultCategoryFilters)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          {categoryColumns.image}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandList className='max-h-none'>
            <CommandLabel>{categoryFilterNames.has_image.title}</CommandLabel>
            <CommandSeparator />
            <CommandGroup>
              {Object.entries(categoryFilterNames.has_image.values).map(
                ([key, value]) => {
                  const castedKey = key as CategoryFilterImage

                  return (
                    <CommandItem
                      key={castedKey}
                      onSelect={() =>
                        setFilters((prev) => ({
                          ...prev,
                          has_image: castedKey,
                        }))
                      }
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary',
                          filters.has_image.includes(castedKey)
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

            <CommandLabel>{categoryFilterNames.formats.title}</CommandLabel>
            <CommandSeparator />
            <CommandGroup>
              {Object.entries(categoryFilterNames.formats.values).map(
                ([key, value]) => {
                  const castedKey = key as CategoryFilterFormats

                  return (
                    <CommandItem
                      key={key}
                      onSelect={() =>
                        setFilters((prev) => ({
                          ...prev,
                          formats: prev.formats.includes(castedKey)
                            ? prev.formats.filter(
                                (format) => format !== castedKey
                              )
                            : [...prev.formats, castedKey],
                        }))
                      }
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          filters.formats.includes(castedKey)
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
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

export default ImageFilter
