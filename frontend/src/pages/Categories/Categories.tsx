import useCategories from '@/hooks/useCategories'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { categoryColumns } from '@/constants/categories/columns'
import { Toolbar } from './Toolbar'
import { useState } from 'react'
import {
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'
import { DataTablePagination } from '@/components/ui/data-table/pagination'

const Categories = () => {
  const {
    categories,
    pagination: { currentPage, lastPage, perPage },
    setPage,
    setPerPage,
    isLoading,
    onSearch,
    search,
    setSort,
    setSortOrder,
    onRowDelete,
    onRowEdit,
    onAdd,
    categoryList,
    setFilters,
    filters,
  } = useCategories()

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const cols = columns({
    setSort,
    setSortOrder,
    onRowDelete,
    onRowEdit,
    categoryList,
  })

  const table = useReactTable({
    data: categories,
    columns: cols,
    state: {
      columnVisibility,
    },
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='w-full h-full'>
      <h1 className='text-4xl font-bold mb-6'>Категории</h1>
      <div className='flex w-full'>
        <div className='space-y-4 w-full'>
          <Toolbar
            table={table}
            columnNames={categoryColumns}
            search={search || ''}
            onSearch={onSearch}
            filters={filters}
            setFilters={setFilters}
            onSave={onAdd}
            categoryList={categoryList}
          />
          <DataTable columns={cols} table={table} isLoading={isLoading} />
          <DataTablePagination
            table={table}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Categories
