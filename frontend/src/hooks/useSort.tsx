import { SortOrder } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const useSort = () => {
  const [_, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  useEffect(() => {
    setSearchParams((prev) => {
      if (sort === null) {
        prev.delete('sort')
      } else {
        prev.set('sort', sort)
      }

      if (sortOrder === 'asc') {
        prev.delete('order')
      } else {
        prev.set('order', sortOrder)
      }

      return prev
    })
  }, [sort, sortOrder])

  return { sort, setSort, setSortOrder, sortOrder }
}

export default useSort
