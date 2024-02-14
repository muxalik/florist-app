import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import { api } from '@/utils/api'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import { passwordData } from '@/types'
import VerificationInput from 'react-verification-input'
import { cn } from '@/lib/utils'

const CODE_LENGTH = 6

const VerifyPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [code, setCode] = useState('')

  const [passwordData] = useLocalStorage<passwordData | null>(
    'passwordData',
    null
  )

  const controller = useRef<AbortController | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      submit()
    }
  }, [code])

  const submit = () => {
    setIsLoading(true)
    setError('')

    controller.current = new AbortController()
    const signal = controller.current.signal

    api
      .post('verify-password', { code }, { signal })
      .then(() => {
        localStorage.setItem(
          'passwordData',
          JSON.stringify({
            email: passwordData?.email,
            code,
          })
        )

        navigate('/update-password')
      })
      .catch((err) => {
        setError(err.response.data?.message)
      })
      .finally(() => setIsLoading(false))
  }

  const onBack = () => {
    controller.current?.abort()
  }

  return (
    <div className='min-h-screen py-[150px] px-[40px] flex items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl mb-2'>Введите код</CardTitle>
          <CardDescription className='text-md'>
            Мы отправили код подтверждения на{' '}
            <span className='font-semibold'>{passwordData?.email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            {error.length > 0 && (
              <div className='px-4 py-2 bg-destructive text-destructive-foreground rounded-md'>
                {error}
              </div>
            )}
            <VerificationInput
              value={code}
              length={CODE_LENGTH}
              validChars='0-9'
              autoFocus
              onChange={(value) => !isLoading && setCode(value)}
              placeholder=''
              classNames={{
                character: cn(
                  buttonVariants({ variant: 'outline' }),
                  '!h-14 text-lg'
                ),
                characterSelected: buttonVariants({ variant: 'secondary' }),
                characterFilled: buttonVariants({ variant: 'outline' }),
              }}
            />
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button variant={'link'} asChild onClick={onBack}>
            <Link to='/request-password'>Отправить на другую почту</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerifyPassword
