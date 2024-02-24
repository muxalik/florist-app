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
import { BaseFilter } from '@/types'

interface FilterProps {
  title: string
  filters: BaseFilter[]
  onClear: () => void
}

const Filter = ({ title, filters, onClear }: FilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Поиск фильтра' />
          <CommandList className='max-h-none'>
            {filters.map(
              (
                { type, title, selected, options, onSelect }: BaseFilter,
                index: number
              ) => {
                return (
                  <>
                    {type === 'radio' && (
                      <RadioFilterGroup
                        id={index + title}
                        title={title}
                        selected={selected as string}
                        options={options}
                        onSelect={onSelect}
                      />
                    )}

                    {type === 'checkbox' && (
                      <CheckboxFilterGroup
                        key={index + title}
                        title={title}
                        options={options}
                        selected={selected as string[]}
                        onSelect={onSelect}
                      />
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
