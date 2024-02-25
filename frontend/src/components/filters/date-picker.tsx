import { ru } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Icons from '../ui/icons'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'

interface DatePickerFilterProps {
  label: string
  date: DateRange | undefined
  onSelect: (range: DateRange | undefined) => void
  onClear: () => void
  hasChanged: boolean
}

const DatePickerFilter = ({
  label,
  date,
  onSelect,
  onClear,
  hasChanged,
}: DatePickerFilterProps) => {
  const [open, setOpen] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200} open={open}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                id='updatedAt'
                variant={'outline'}
                size='sm'
                className={cn(
                  'justify-start border-dashed flex gap-1.5',
                  !date && 'text-muted-foreground'
                )}
              >
                <Icons.calendar className='h-4 w-4' />
                {label}
                {hasChanged && (
                  <div className='bg-primary rounded-full w-2 h-2' />
                )}
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='center'>
            <Calendar
              locale={ru}
              initialFocus
              mode='range'
              className=' capitalize'
              selected={date}
              onSelect={onSelect}
              toDate={new Date(Date.now())}
              numberOfMonths={2}
            />
            <div className='py-2 px-3 flex justify-center'>
              <Button onClick={onClear} className='px-12'>
                Очистить
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <TooltipContent>
          <p className='capitalize'>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale: ru })} -{' '}
                  {format(date.to, 'LLL dd, y', { locale: ru })}
                </>
              ) : (
                'После ' + format(date.from, 'LLL dd, y', { locale: ru })
              )
            ) : (
              <span>Выберите даты</span>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default DatePickerFilter
