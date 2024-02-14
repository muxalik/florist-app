import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
import { useRef, useState } from 'react'
import Icons from '@/components/Icons'
import { api } from '@/utils/api'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import { passwordData } from '@/types'
import { CanceledError } from 'axios'

const formSchema = z
  .object({
    password: z.string().min(10, 'Минимум 10 символов').max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordData, setPasswordData] = useLocalStorage<passwordData | null>(
    'passwordData',
    null
  )
  const controller = useRef<AbortController | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const navigate = useNavigate()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError('')

    controller.current = new AbortController()
    const signal = controller.current.signal

    api
      .patch(
        'reset-password',
        {
          code: passwordData?.code,
          email: passwordData?.email,
          password: data.password,
        },
        { signal }
      )
      .then(() => {
        setPasswordData(null)
        navigate('/login')
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) {
          setError(err.response.data?.message)
        }
      })
      .finally(() => setIsLoading(false))
  }

  const onBack = () => {
    controller.current?.abort()
  }

  return (
    <div className='min-h-screen py-[150px] px-[40px] flex items-center justify-center'>
      <Card className='w-[350px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type='email' value={passwordData?.email || ''} hidden />
            <CardHeader className='text-center'>
              <CardTitle className='text-3xl mb-2'>Обновить пароль</CardTitle>
              <CardDescription className='text-md'>
                Последний шаг!
                <br />
                Придумайте новый пароль
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                {error.length > 0 && (
                  <div className='px-4 py-2 bg-destructive text-destructive-foreground rounded-md'>
                    {error}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Введите новый пароль'
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel>Подтвердите пароль</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Введите пароль еще раз'
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className='flex-col gap-2'>
              <Button
                type='submit'
                className='w-full flex gap-2'
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className='text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
                )}
                Обновить пароль
              </Button>
              <Button variant={'link'} asChild onClick={onBack}>
                <Link to='/login'>Отменить</Link>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default UpdatePassword
