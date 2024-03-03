import { Color, ColorFilter as ColorFilterType } from '@/types'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandLabel,
  CommandSeparator,
} from '../ui/command'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Icons from '../ui/icons'

interface ColorFilterProps {
  title: string
  filter: ColorFilterType
}

const ColorFilter = ({ title, filter }: ColorFilterProps) => {
  const [open, setOpen] = useState(false)

  return (
    <CommandGroup key='colors'>
      <CommandLabel>{title}</CommandLabel>
      <CommandSeparator className='mb-1' />
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            className={cn(
              'justify-between text-wrap h-auto min-h-9 cursor-pointer w-full my-1',
              !filter.selected.length && 'text-muted-foreground'
            )}
            asChild
          >
            <CommandItem onSelect={() => setOpen(true)}>
              <>
                <div className='flex items-center gap-2'>
                  {filter.selected.length ? (
                    <span>
                      {filter.selected.length + +filter.without} выбрано
                    </span>
                  ) : (
                    'Выберите цвета'
                  )}
                </div>
                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </>
            </CommandItem>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0 w-[230px]'>
          <Command>
            <CommandInput placeholder='Поиск...' className='h-9' />
            <CommandEmpty>Цвет не найден.</CommandEmpty>
            <ScrollArea className='h-[190px] z-20'>
              <CommandGroup>
                <CommandItem
                  value={'none'}
                  key={'default'}
                  onSelect={() => {
                    setOpen(false)
                    filter.onWithoutColorChange(!filter.without)
                  }}
                  className='flex gap-2'
                >
                  <div className='w-6 h-6 rounded-full border' />
                  <span>Без цвета</span>
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      filter.without ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
                {filter.colors.map((color, index) => (
                  <CommandItem
                    value={'' + color.id}
                    key={index}
                    onSelect={() => {
                      filter.onSelect(color.id)
                    }}
                    className='flex gap-2'
                  >
                    <div
                      className='w-6 h-6 rounded-full'
                      style={{
                        backgroundColor: color?.hex,
                      }}
                    />
                    {color.name}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        filter.selected.includes(color.id)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      {(filter.selected.length > 0 || filter.without) && (
        <ul className='grid grid-cols-5 gap-x-1 gap-y-2 py-2'>
          {filter.without && (
            <li key='without'>
              <Button
                className='group w-8 h-8 flex items-center justify-center hover:border-black border-transparent transition-colors duration-100 rounded-full border cursor-pointer p-0'
                style={{
                  backgroundColor: 'white',
                }}
                onClick={() => filter.onWithoutColorChange(!filter.without)}
              >
                <Icons.close className='w-4 h-4 text-blac text-transparent transition-colors duration-100 group-hover:text-gray-700' />
              </Button>
            </li>
          )}
          {filter.selected.map((colorId: number) => (
            <li key={colorId}>
              <Button
                className='group w-8 h-8 flex items-center justify-center hover:border-black border-transparent transition-colors duration-100 rounded-full border cursor-pointer p-0'
                style={{
                  backgroundColor: filter.colors.find(
                    (color: Color) => color.id === colorId
                  )?.hex,
                }}
                onClick={() => filter.onSelect(colorId)}
              >
                <Icons.close className='w-4 h-4 text-blac text-transparent transition-colors duration-100 group-hover:text-gray-700' />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </CommandGroup>
  )
}

export default ColorFilter
