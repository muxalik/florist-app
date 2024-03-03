import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Row } from '@tanstack/react-table'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Manufacturer } from '@/types/manufacturer'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { Label } from '@/components/ui/label'
import { preview } from '@/assets'

const formSchema = z.object({
  id: z.number(),
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
  productsCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

interface ViewTagProps {
  row: Row<Manufacturer>
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ViewManufacturer({ row, open, onOpenChange }: ViewTagProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: row.getValue('id'),
      name: row.getValue('name'),
      productsCount: row.getValue('productsCount'),
      createdAt: row.getValue('createdAt') || 'Не задано',
      updatedAt: row.getValue('updatedAt') || 'Не задано',
    },
  })

  const isImageRemoved = !row.getValue('image')

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>
                Просмотреть производителя
              </SheetTitle>
              <SheetDescription>
                Здесь вы можете просмотреть производителя.
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={(e) => e.preventDefault()}
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
                            onChange={() => {}}
                          />
                        </FormControl>
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
                            onChange={() => {}}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='grid gap-2'>
                    <Label htmlFor='image'>{manufacturerColumns.image}</Label>
                    <div className='p-2 rounded-sm border border-dashed relative flex justify-center'>
                      {!isImageRemoved ? (
                        <img
                          src={row.getValue('image')}
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
                  </div>
                  <FormField
                    control={form.control}
                    name='productsCount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {manufacturerColumns.productsCount}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${manufacturerColumns.productsCount}`}
                            {...field}
                            onChange={() => {}}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='createdAt'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{manufacturerColumns.createdAt}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${manufacturerColumns.createdAt}`}
                            {...field}
                            onChange={() => {}}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='updatedAt'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{manufacturerColumns.updatedAt}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${manufacturerColumns.updatedAt}`}
                            {...field}
                            onChange={() => {}}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default ViewManufacturer
