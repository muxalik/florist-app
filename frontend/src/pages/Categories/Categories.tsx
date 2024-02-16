import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { DataTable } from './DataTable/DataTable'
import { columns } from './DataTable/columns'
import { Category } from '@/types'
import { api } from '@/utils/api'
import { useSearchParams } from 'react-router-dom'

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState<Category[]>([])
  
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      api
        .get('categories?' + searchParams.toString())
        .then((res) => {
          setCategories(res.data.data)
          console.log(res.data)
        })
        .catch(console.log)
    }, 200)

    timerRef.current = timer

    return () => {
      clearTimeout(timer)
      timerRef.current = null
    }
  }, [searchParams])

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchParams((prev) => {
      if (value) {
        prev.set('q', value)
      } else {
        prev.delete('q')
      }

      return prev
    })
  }

  return (
    <div className='w-full h-full'>
      <h1 className='text-4xl font-bold mb-6'>Категории</h1>
      <div className='flex w-full'>
        <DataTable
          data={categories}
          columns={columns}
          onSearch={onSearch}
          search={searchParams.get('q') || ''}
        />
      </div>
    </div>
  )
}

export default Categories
