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
import { useAuth } from '@/context/AuthContext'
import api from '@/utils/api'
import { useState } from 'react'
import Icons from '@/components/Icons'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Заполните поле' })
    .max(50)
    .email('Некорректная почта'),
  password: z
    .string()
    .min(1, { message: 'Заполните поле' })
    .max(50, { message: 'Слишком длинный пароль' }),
})

const Login = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    api
      .post('login', data)
      .then((res) =>
        login({
          ...res.data.user,
          token: res.data.token,
        })
      )
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='min-h-screen py-[150px] px-[40px] flex items-center justify-center'>
      <Card className='w-[350px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className='text-center'>
              <CardTitle className='text-3xl'>Войти</CardTitle>
              <CardDescription className='text-md'>
                Введите вашу почту и пароль, чтобы войти в систему
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel>Почта</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='example@mail.com'
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
                  name='password'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Введите пароль'
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
            <CardFooter>
              <Button
                type='submit'
                className='w-full flex gap-2'
                disabled={isLoading}
              >
                {isLoading && (
                  <Icons.spinner className='text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
                )}
                Продолжить
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Login
