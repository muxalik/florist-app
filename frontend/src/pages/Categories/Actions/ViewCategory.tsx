import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { categoryColumns } from '@/constants/categories/columns'
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
  FormMessage,
} from '@/components/ui/form'
import { preview } from '@/assets'
import { Category, SimpleCategory } from '@/types/category'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

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

interface ViewCategoryProps {
  row: Row<Category>
  open: boolean
  onOpenChange: (open: boolean) => void
  categoryList: SimpleCategory[]
}

function ViewCategory({
  row,
  open,
  onOpenChange,
  categoryList,
}: ViewCategoryProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: row.getValue('name'),
      parentId: row.original.parentId,
    },
  })

  const isImageRemoved = !row.getValue('image')

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>Просмотреть категорию</SheetTitle>
              <SheetDescription>
                Здесь вы можете просмотреть категорию.
              </SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className='flex flex-col gap-6 pb-2 h-full flex-1 justify-between'
              >
                <div className='flex flex-col gap-6 '>
                  <div className='grid gap-2'>
                    <Label htmlFor='id'>{categoryColumns.id}</Label>
                    <Input
                      id='id'
                      value={row.getValue('id')}
                      onChange={() => {}}
                    />
                  </div>
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
                            onChange={() => {}}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className='grid gap-2'>
                    <Label htmlFor='image'>{categoryColumns.image}</Label>
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
                    name='parentId'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>{categoryColumns.parentName}</FormLabel>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'justify-between text-wrap h-auto min-h-9 hover:bg-transparent cursor-default',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <div className='flex'>
                              {!!field.value && (
                                <Badge variant={'outline'} className='mr-2'>
                                  {
                                    categoryList.find(
                                      (category) => category.id === field.value
                                    )?.id
                                  }
                                </Badge>
                              )}
                              {field.value
                                ? categoryList.find(
                                    (category) => category.id === field.value
                                  )?.name
                                : 'Нет'}
                            </div>
                          </Button>
                        </FormControl>
                        <FormMessage />
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

export default ViewCategory
