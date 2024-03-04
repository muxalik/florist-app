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
import { tagColumns } from '@/constants/tags/columns'
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
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useManufacturers } from '../store'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { Label } from '@/components/ui/label'
import { preview } from '@/assets'
import {
  CreateManufacturerSchema,
  createManufacturerSchema,
} from '@/constants/manufacturers/schema'

const CreateManufacturer = () => {
  const onAdd = useManufacturers((state) => state.onAdd)

  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<File | null>(null)

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

  const form = useForm<CreateManufacturerSchema>({
    resolver: zodResolver(createManufacturerSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(values: CreateManufacturerSchema) {
    onAdd({
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
        <Button size='sm' className='ml-auto h-8 flex'>
          <Icons.plusCircle className='mr-2 h-4 w-4' />
          Добавить
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>
                Добавить нового производителя
              </SheetTitle>
              <SheetDescription>
                Здесь вы можете создать производителя. Когда заполните все
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

export default CreateManufacturer
