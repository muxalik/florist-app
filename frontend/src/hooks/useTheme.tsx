import { Theme } from '@/types'
import { useState } from 'react'

const useTheme = () => {
  const userTheme = localStorage.getItem('theme')
  const systemTheme = window.matchMedia('(prefers-colors-scheme: dark)').matches

  const [theme, setTheme] = useState<Theme>(
    userTheme === 'dark' || (!userTheme && systemTheme) ? 'dark' : 'light'
  )

  if (theme === 'dark') {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark')
    }

    localStorage.setItem('theme', 'dark')
  }

  if (theme === 'light') {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', 'light')
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, setTheme, toggleTheme }
}

export default useTheme
