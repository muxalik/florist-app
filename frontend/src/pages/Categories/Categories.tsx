import useCategories from '@/hooks/useCategories'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { categoryColumns } from '@/constants/categories/columns'

const Categories = () => {
  const {
    categories,
    pagination: { currentPage, lastPage, perPage },
    setPage,
    setPerPage,
    isLoading,
    onSearch,
    filters: { q: search },
    onSort,
    setSortOrder,
  } = useCategories()

  return (
    <div className='w-full h-full'>
      <h1 className='text-4xl font-bold mb-6'>Категории</h1>
      <div className='flex w-full'>
        <DataTable
          data={categories}
          columns={columns({ onSort, setSortOrder })}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          setPage={setPage}
          setPerPage={setPerPage}
          isLoading={isLoading}
          columnNames={categoryColumns}
          onSearch={onSearch}
          search={search || ''}
        />
      </div>
    </div>
  )
}

export default Categories
