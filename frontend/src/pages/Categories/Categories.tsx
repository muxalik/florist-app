import { CategoriesProvider } from '@/context/CategoriesContext'
import TableWrapper from './TableWrapper'

const Categories = () => {
  return (
    <div className='w-full h-full'>
      <h1 className='text-4xl font-bold mb-6'>Категории</h1>
      <div className='flex w-full'>
        <CategoriesProvider>
          <TableWrapper />
        </CategoriesProvider>
      </div>
    </div>
  )
}

export default Categories
