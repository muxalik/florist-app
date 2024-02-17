import { useRef } from 'react'

const useDebounce = (callback: () => void, timeout = 1000) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  return () => {
    const timer = setTimeout(() => {
      callback()
    }, timeout)

    timerRef.current = timer
  }
}

export default useDebounce
