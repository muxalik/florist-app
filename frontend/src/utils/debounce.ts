const debounce = (callback: () => void, delay: number) => {
  let timer: NodeJS.Timeout | null = null

  return () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      callback()
    }, delay)
  }
}

export default debounce
