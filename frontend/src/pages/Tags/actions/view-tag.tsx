import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { tagColumns } from '@/constants/tags/columns'
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
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tag } from '@/types/tag'
import { useTags } from '../store'

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
  row: Row<Tag>
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ViewTag({ row, open, onOpenChange }: ViewTagProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: row.getValue('id'),
      name: row.getValue('name'),
      colorId: row.original.color?.id,
      productsCount: row.getValue('productsCount'),
      createdAt: row.getValue('createdAt') || 'Не задано',
      updatedAt: row.getValue('updatedAt') || 'Не задано',
    },
  })

  const colors = useTags((state) => state.colors)

  const currentColor = colors.find(
    (color) => color.id === form.getValues().colorId
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-[400px] sm:w-[540px] p-0 pr-1'>
        <ScrollArea className='w-full h-full'>
          <div className='px-6 py-6 min-h-screen flex flex-col'>
            <SheetHeader className='mb-10'>
              <SheetTitle className='mb-2'>Просмотреть тег</SheetTitle>
              <SheetDescription>
                Здесь вы можете просмотреть тег.
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
                        <FormLabel>{tagColumns.id}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${tagColumns.id}`}
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
                        <FormLabel>{tagColumns.name}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${tagColumns.name}`}
                            {...field}
                            onChange={() => {}}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='colorId'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>{tagColumns.color}</FormLabel>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'justify-between text-wrap h-auto min-h-9 hover:bg-transparent cursor-default',
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
                              {field.value ? currentColor?.name : 'Нет'}
                            </div>
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='productsCount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{tagColumns.productsCount}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${tagColumns.productsCount}`}
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
                        <FormLabel>{tagColumns.createdAt}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${tagColumns.createdAt}`}
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
                        <FormLabel>{tagColumns.updatedAt}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Введите ${tagColumns.updatedAt}`}
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

export default ViewTag
