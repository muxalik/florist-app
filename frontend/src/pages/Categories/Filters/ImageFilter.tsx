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
  CategoryFilterFormats,
  CategoryFilterImage,
  CategoryFilters,
} from '@/types/category'
import { CheckIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { categoryColumns } from '@/constants/categories/columns'
import { cn } from '@/lib/utils'
import {
  categoryFilterNames,
  defaultCategoryFilters,
} from '@/constants/categories/filters'
import RadioFilterGroup from '@/components/filters/radio-filter-group'

interface ImageFilterProps {
  setFilters: (filters: Partial<CategoryFilters>) => void
  filters: CategoryFilters
}

const ImageFilter = ({ filters, setFilters }: ImageFilterProps) => {
  const onClear = () =>
    setFilters({
      ...filters,
      has_image: defaultCategoryFilters.has_image,
      formats: defaultCategoryFilters.formats,
    })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          {categoryColumns.image}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Фильтр' />
          <CommandList className='max-h-none'>
            <RadioFilterGroup
              title={categoryColumns.image}
              selected={filters.has_image}
              options={[
                {
                  key: 'yes',
                  name: 'Есть',
                },
                {
                  key: 'no',
                  name: 'Нет',
                },
                {
                  key: 'any',
                  name: 'Неважно',
                },
              ]}
              onSelect={(key: string) =>
                setFilters({ has_image: key as CategoryFilterImage })
              }
            />

            <CommandSeparator />

            <CommandGroup>
              <CommandLabel>{categoryFilterNames.formats.title}</CommandLabel>
              <CommandSeparator className='mb-1' />
              {Object.entries(categoryFilterNames.formats.values).map(
                ([key, value]) => {
                  const castedKey = key as CategoryFilterFormats

                  return (
                    <CommandItem
                      key={key}
                      onSelect={() =>
                        setFilters({
                          formats: filters.formats.includes(castedKey)
                            ? filters.formats.filter(
                                (format) => format !== castedKey
                              )
                            : [...filters.formats, castedKey],
                        })
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
