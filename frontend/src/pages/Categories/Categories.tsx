import { useEffect, useState } from 'react'
import { DataTable } from './DataTable/DataTable'
import { columns } from './DataTable/columns'
import { Category } from '@/types'
import { api } from '@/utils/api'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    api
      .get('categories')
      .then((res) => setCategories(res.data))
      .catch(console.log)
  }, [])

  return (
    <div className='w-full h-full'>
      <h1 className='text-4xl font-bold mb-6'>Категории</h1>
      <div className='flex w-full'>
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  )
}

export default Categories
