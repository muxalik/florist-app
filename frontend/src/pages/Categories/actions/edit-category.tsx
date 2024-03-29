import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { categoryColumns } from '@/constants/categories/columns'
import { Row } from '@tanstack/react-table'
import Icons from '@/components/ui/icons'
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
import { Category, CategoryEditData } from '@/types/category'
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
import { useCategories } from '../store'
import {
  EditCategorySchema,
  editCategorySchema,
} from '@/constants/categories/schema'

interface EditCategoryProps {
  row: Row<Category>
  open: boolean
  onOpenChange: (open: boolean) => void
  onCancel: () => void
}

function EditCategory({
  row,
  open,
  onOpenChange,
  onCancel,
}: EditCategoryProps) {
  const [image, setImage] = useState<File | null>(null)
  const [isImageRemoved, setIsImageRemoved] = useState(!row.getValue('image'))
  const [openCategories, setOpenCategories] = useState(false)

  const onSave = useCategories((state) => state.onEdit)
  const categoryList = useCategories((state) => state.simpleCategories)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onImageClick = () => {
    fileInputRef.current!.click()
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files![0]

    setImage(selectedFile)
    setIsImageRemoved(false)
  }

  const onCloseImage: MouseEventHandler = (e) => {
    e.stopPropagation()

    setImage(null)
    setIsImageRemoved(true)
    fileInputRef.current!.value = ''
  }

  const onRefreshImage: MouseEventHandler = (e) => {
    e.stopPropagation()

    setImage(null)
  }

  const form = useForm<EditCategorySchema>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      id: row.getValue('id'),
      name: row.getValue('name'),
      parentId: row.original.parentId,
    },
  })

  function onSubmit(values: EditCategorySchema) {
    const data: CategoryEditData = {
      ...values,
      image,
    }

    onSave(row.getValue('id'), data)
    onOpenChange(false)
  }

  const imageUrl = image ? URL.createObjectURL(image) : ''

  const filteredCategories = categoryList.filter(
    (category) => category.id !== row.getValue('id')
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>Редактировать категорию</SheetTitle>
              <SheetDescription>
                Здесь вы можете изменить категорию. Когда сделаете все
                изменения, нажмите Сохранить.
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
                    name='id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{categoryColumns.id}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${categoryColumns.id}`}
                            {...field}
                            disabled
                            onChange={() => {}}
                          />
                        </FormControl>
                        <FormDescription>Не заполняется</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        {!!image ||
                          (!!row.getValue('image') && !isImageRemoved && (
                            <Button
                              variant={'outline'}
                              size={'icon'}
                              onClick={onCloseImage}
                            >
                              <Icons.close />
                            </Button>
                          ))}

                        {!!image && (
                          <Button
                            variant={'outline'}
                            size={'icon'}
                            className='text-gray-600'
                            onClick={onRefreshImage}
                          >
                            <Icons.refresh />
                          </Button>
                        )}
                      </div>
                      {!isImageRemoved ? (
                        <img
                          src={imageUrl || row.getValue('image')}
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
                                  'justify-between text-wrap h-auto min-h-9',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                <div className='flex items-center'>
                                  {!!field.value && (
                                    <Badge
                                      variant={'outline'}
                                      className='mr-2 h-8'
                                    >
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
                                  {filteredCategories.map((category) => (
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
                      onCancel()

                      setTimeout(() => {
                        form.reset()
                        setImage(null)
                      }, 300)
                    }}
                  >
                    Отмена
                  </Button>
                  <Button className='flex-1'>Сохранить</Button>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default EditCategory
