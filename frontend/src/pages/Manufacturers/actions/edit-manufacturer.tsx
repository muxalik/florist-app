import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Row } from '@tanstack/react-table'
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
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useManufacturers } from '../store'
import { Manufacturer, ManufacturerEditData } from '@/types/manufacturer'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { preview } from '@/assets'
import Icons from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import {
  EditManufacturerSchema,
  editManufacturerSchema,
} from '@/constants/manufacturers/schema'

interface EditManufacturerProps {
  row: Row<Manufacturer>
  open: boolean
  onOpenChange: (open: boolean) => void
  onCancel: () => void
}

function EditManufacturer({
  row,
  open,
  onOpenChange,
  onCancel,
}: EditManufacturerProps) {
  const [image, setImage] = useState<File | null>(null)
  const [isImageRemoved, setIsImageRemoved] = useState(!row.getValue('image'))

  const onSave = useManufacturers((state) => state.onEdit)

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
  const form = useForm<EditManufacturerSchema>({
    resolver: zodResolver(editManufacturerSchema),
    defaultValues: {
      id: row.getValue('id'),
      name: row.getValue('name'),
    },
  })

  function onSubmit(values: EditManufacturerSchema) {
    const data: ManufacturerEditData = {
      ...values,
      image,
    }

    onSave(row.getValue('id'), data)
    onOpenChange(false)
  }

  const imageUrl = image ? URL.createObjectURL(image) : ''

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>
                Редактировать производителя
              </SheetTitle>
              <SheetDescription>
                Здесь вы можете изменить производителя. Когда сделаете все
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
                        <FormLabel>{manufacturerColumns.id}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${manufacturerColumns.id}`}
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
                        <FormLabel>{manufacturerColumns.name}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${manufacturerColumns.name}`}
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
                    <Label htmlFor='image'>{manufacturerColumns.image}</Label>
                    <Input
                      type='file'
                      accept='image/*'
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={onImageChange}
                      placeholder={`Введите ${manufacturerColumns.image}`}
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

export default EditManufacturer
