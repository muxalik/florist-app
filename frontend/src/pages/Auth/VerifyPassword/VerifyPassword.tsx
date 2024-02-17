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
import Icons from '@/components/ui/icons'

const CODE_LENGTH = 6

const VerifyPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResening] = useState(false)
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [timeoutEnd, setTimeoutEnd] = useState<Date | null>(null)

  const [passwordData] = useLocalStorage<passwordData | null>(
    'passwordData',
    null
  )

  const controller = useRef<AbortController | null>(null)
  const resendController = useRef<AbortController | null>(null)

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

        resendController.current?.abort()

        navigate('/update-password')
      })
      .catch((err) => {
        setError(err.response.data?.message)
      })
      .finally(() => setIsLoading(false))
  }

  const onResend = () => {
    setIsResening(true)
    setError('')

    resendController.current = new AbortController()
    const signal = resendController.current.signal

    api
      .post('/request-password', { email: passwordData?.email }, { signal })
      .then(console.log)
      .catch((err) => {
        setError(err.response?.data?.message)
        setTimeoutEnd(new Date(err.response?.data?.timeoutEnd))
        setTimeLeft(calculateTimeLeft())
        console.log(err)
      })
      .finally(() => setIsResening(false))
  }

  const onBack = () => {
    controller.current?.abort()
    resendController.current?.abort()
  }

  const calculateTimeLeft = (): TimeLeft => {
    let timeLeft: TimeLeft = {
      minutes: 0,
      seconds: 0,
    }

    if (!timeoutEnd) {
      return timeLeft
    }

    const difference = +new Date(timeoutEnd) - +new Date()

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 0)

    return () => clearTimeout(timer)
  })

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time)

  const isTimeout = timeLeft.minutes > 0 || timeLeft.seconds > 0

  const formattedTime = isTimeout
    ? `${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`
    : ''

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
          {isTimeout && (
            <p className='text-sm font-medium text-gray-600'>
              Запросить новый код можно через <span>{formattedTime}</span>
            </p>
          )}
          <Button
            variant={'outline'}
            onClick={onResend}
            disabled={isResending || isTimeout}
            className='flex gap-2 text-gray-600'
          >
            {isResending && (
              <Icons.spinner className='text-gray-200 animate-spin dark:text-gray-600' />
            )}
            Отправить еще раз
          </Button>
          <Button variant={'link'} asChild onClick={onBack}>
            <Link to='/request-password'>Отправить на другую почту</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

type TimeLeft = {
  minutes: number
  seconds: number
}

export default VerifyPassword
