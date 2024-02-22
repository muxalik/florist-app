import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react'
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
import { categoryColumns } from '@/constants/categories/columns'
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
import { preview } from '@/assets'
import { CategoryAddData, SimpleCategory } from '@/types/category'

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
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'

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
  parentId: z.number().nullable(),
})

interface AddSheetProps {
  onSave: (data: CategoryAddData) => void
  categoryList: SimpleCategory[]
}

function AddSheet({ onSave, categoryList }: AddSheetProps) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [openCategories, setOpenCategories] = useState(false)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onImageClick = () => {
    fileInputRef.current!.click()
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files![0]

    setImage(selectedFile)
  }

  const onCloseImage: MouseEventHandler = (e) => {
    e.stopPropagation()

    setImage(null)
    fileInputRef.current!.value = ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      parentId: null,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave({
      ...values,
      image,
    })

    setOpen(false)
    setTimeout(() => {
      form.reset()
      setImage(null)
    }, 300)
  }

  const imageUrl = image ? URL.createObjectURL(image) : ''

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size='sm' className='ml-auto hidden h-8 lg:flex'>
          <Icons.plusCircle className='mr-2 h-4 w-4' />
          Добавить
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>Добавить новую категорию</SheetTitle>
              <SheetDescription>
                Здесь вы можете создать категорию. Когда заполните все
                необходимые поля, нажмите Добавить.
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
                        <FormLabel>{categoryColumns.name}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${categoryColumns.name}`}
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
                  <div className='grid gap-2'>
                    <Label htmlFor='image'>{categoryColumns.image}</Label>
                    <Input
                      type='file'
                      accept='image/*'
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={onImageChange}
                      placeholder={`Введите ${categoryColumns.image}`}
                    />
                    <div
                      className='p-2 rounded-sm border border-dashed relative flex justify-center cursor-pointer'
                      onClick={onImageClick}
                    >
                      <div className='absolute -right-2 -top-2 z-30 text-gray-600 flex gap-2'>
                        {!!image && (
                          <Button
                            variant={'outline'}
                            size={'icon'}
                            onClick={onCloseImage}
                          >
                            <Icons.close />
                          </Button>
                        )}
                      </div>
                      {!!image ? (
                        <img
                          src={imageUrl}
                          alt='Превью'
                          className='rounded-sm'
                        />
                      ) : (
                        <img
                          src={preview}
                          alt='Нет изображения'
                          className='h-12 w-12'
                        />
                      )}
                    </div>
                    <FormDescription>Необязательно</FormDescription>
                  </div>
                  <FormField
                    control={form.control}
                    name='parentId'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>{categoryColumns.parentName}</FormLabel>
                        <Popover
                          modal={true}
                          open={openCategories}
                          onOpenChange={setOpenCategories}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'justify-between text-left gap-2 text-wrap h-auto min-h-9',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                <div className='flex gap-2 items-center'>
                                  {!!field.value && (
                                    <Badge variant={'outline'}>
                                      {
                                        categoryList.find(
                                          (category) =>
                                            category.id === field.value
                                        )?.id
                                      }
                                    </Badge>
                                  )}
                                  {field.value
                                    ? categoryList.find(
                                        (category) =>
                                          category.id === field.value
                                      )?.name
                                    : 'Выберите категорию'}
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
                              <CommandEmpty>Категория не найдена.</CommandEmpty>
                              <ScrollArea className='h-[190px] z-20'>
                                <CommandGroup>
                                  {categoryList.map((category) => (
                                    <CommandItem
                                      value={category.name + category.id}
                                      key={category.name}
                                      onSelect={() => {
                                        setOpenCategories(false)
                                        form.setValue('parentId', category.id)
                                      }}
                                      className='flex gap-2'
                                    >
                                      <Badge variant={'outline'}>
                                        {category.id}
                                      </Badge>
                                      {category.name}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          category.id === field.value
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
                        setImage(null)
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

export default AddSheet
