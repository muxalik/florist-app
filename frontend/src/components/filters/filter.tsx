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
import { BaseFilter, SliderFilter } from '@/types'
import SliderFilterGroup from './slider-filter-group'

interface FilterProps {
  title: string
  filters: (BaseFilter | SliderFilter)[]
  onClear: () => void
  hasChanged: boolean
}

const Filter = ({ title, filters, onClear, hasChanged }: FilterProps) => {
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
            <div className=' bg-primary rounded-full h-2 w-2'></div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Поиск фильтра' />
          <CommandList className='max-h-none'>
            {filters.map((filter: BaseFilter | SliderFilter, index: number) => {
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

                  <CommandSeparator />
                </>
              )
            })}

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
