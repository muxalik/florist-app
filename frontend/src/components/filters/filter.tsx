import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import RadioFilterGroup from '@/components/filters/radio-filter-group'
import CheckboxFilterGroup from '@/components/filters/checkbox-filter-group'
import { BaseFilter, ColorFilter, SliderFilter } from '@/types'
import SliderFilterGroup from './slider-filter-group'
import ColorFilterComp from './color-filter'

interface FilterProps {
  title: string
  filters: (BaseFilter | SliderFilter | ColorFilter)[]
  onClear: () => void
  hasChanged: boolean
  withSearch?: boolean
}

const Filter = ({
  title,
  filters,
  onClear,
  hasChanged,
  withSearch = true,
}: FilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 border-dashed flex gap-1.5'
        >
          <MixerHorizontalIcon className='h-4 w-4' />
          {title}
          {hasChanged && (
            <div className='bg-primary rounded-full h-2 w-2' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[220px] p-0' align='center'>
        <Command>
          {withSearch && <CommandInput placeholder='Поиск фильтра' />}
          <CommandList className='max-h-none'>
            {filters.map(
              (
                filter: BaseFilter | SliderFilter | ColorFilter,
                index: number
              ) => {
                return (
                  <>
                    {filter.type === 'radio' && (
                      <RadioFilterGroup
                        id={index}
                        title={filter.title}
                        selected={filter.selected as string}
                        options={filter.options}
                        onSelect={filter.onSelect}
                      />
                    )}

                    {filter.type === 'checkbox' && (
                      <CheckboxFilterGroup
                        id={index + title}
                        title={filter.title}
                        options={filter.options}
                        selected={filter.selected as string[]}
                        onSelect={filter.onSelect}
                      />
                    )}

                    {filter.type === 'slider' && (
                      <SliderFilterGroup
                        id={index + title}
                        title={filter.title}
                        options={filter.options}
                        onChange={filter.onChange}
                      />
                    )}

                    {filter.type === 'color' && (
                      <ColorFilterComp title={filter.title} filter={filter} />
                    )}

                    <CommandSeparator />
                  </>
                )
              }
            )}

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

export default Filter
