import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { tagColumns } from '@/constants/tags/columns'
import Icons from '@/components/ui/icons'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTags } from '../store'
import { TagAddData } from '@/types/tag'

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Название должно быть не менее 2 символов',
    })
    .max(50, {
      message: 'Название должно быть не более 50 символов',
    })
    .max(50),
  colorId: z.number().nullable(),
})

function CreateTag() {
  const onAdd = useTags((state) => state.onAdd)
  const colors = useTags((state) => state.colors)

  const [open, setOpen] = useState(false)
  const [openColors, setOpenColors] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      colorId: null,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAdd(values as TagAddData)

    setOpen(false)
    setTimeout(() => {
      form.reset()
    }, 300)
  }

  const currentColor = colors.find(
    (color) => color.id === form.getValues().colorId
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size='sm' className='ml-auto h-8 flex'>
          <Icons.plusCircle className='mr-2 h-4 w-4' />
          Добавить
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>Добавить новый тег</SheetTitle>
              <SheetDescription>
                Здесь вы можете создать тег. Когда заполните все необходимые
                поля, нажмите Добавить.
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-6 pb-2 h-full flex-1 justify-between'
              >
                <div className='flex flex-col gap-6 '>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tagColumns.name}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${tagColumns.name}`}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          От 2 до 50 символов включительно
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='colorId'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>{tagColumns.color}</FormLabel>
                        <Popover
                          modal={true}
                          open={openColors}
                          onOpenChange={setOpenColors}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'justify-between text-wrap h-auto min-h-9',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                <div className='flex items-center gap-2'>
                                  {!!field.value && (
                                    <div
                                      className='w-6 h-6 rounded-full'
                                      style={{
                                        backgroundColor: currentColor?.hex,
                                      }}
                                    />
                                  )}
                                  {field.value
                                    ? currentColor?.name
                                    : 'Выберите цвет'}
                                </div>
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='p-0 w-[335px]'>
                            <Command>
                              <CommandInput
                                placeholder='Поиск...'
                                className='h-9'
                              />
                              <CommandEmpty>Цвет не найден.</CommandEmpty>
                              <ScrollArea className='h-[190px] z-20'>
                                <CommandGroup>
                                  <CommandItem
                                    value={'none'}
                                    key={'default'}
                                    onSelect={() => {
                                      setOpenColors(false)
                                      form.setValue('colorId', null)
                                    }}
                                    className='flex gap-2'
                                  >
                                    <div className='w-6 h-6 rounded-full border' />
                                    <span>Без цвета</span>
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        field.value === null
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                  {colors.map((color, index) => (
                                    <CommandItem
                                      value={'' + color.id}
                                      key={index}
                                      onSelect={() => {
                                        setOpenColors(false)
                                        form.setValue('colorId', color.id)
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
                                          color.id === field.value
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
                        <FormDescription>Необязательно</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <SheetFooter className='flex w-full'>
                  <Button
                    variant={'outline'}
                    className='flex-1'
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)

                      setTimeout(() => {
                        form.reset()
                      }, 300)
                    }}
                  >
                    Отмена
                  </Button>
                  <Button type='submit' className='flex-1'>
                    Добавить
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default CreateTag
