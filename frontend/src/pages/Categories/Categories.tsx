import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { categoryColumns } from '@/constants/categories/columns'
import { CategoriesToolbar } from './Toolbar'
import { useEffect, useState } from 'react'
import {
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'
import { DataTablePagination } from '@/components/ui/data-table/pagination'
import { useCategories } from './store/useCategories'
import { useSearchParams } from 'react-router-dom'
import { initialPagination } from '@/constants/pagination'
import { defaultCategoryFilters } from '@/constants/categories/filters'
import { CategoryFilter } from '@/types/category'
import _ from 'lodash'
import { useCategoryFilters } from './store/useCategoryFilters'

const Categories = () => {
  const categories = useCategories((state) => state.categories)
  const isLoading = useCategories((state) => state.isLoading)
  const setPage = useCategories((state) => state.setPage)
  const setPerPage = useCategories((state) => state.setPerPage)
  const filters = useCategoryFilters((state) => state.filters)
  const sort = useCategories((state) => state.sort)
  const sortOrder = useCategories((state) => state.sortOrder)
  const fetchCategories = useCategories((state) => state.fetchCategories)
  const search = useCategories((state) => state.search)
  const { currentPage, lastPage, perPage } = useCategories(
    (state) => state.pagination
  )
  const [searchParams, setSearchParams] = useSearchParams()

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const cols = columns()

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

  useEffect(() => {
    fetchCategories()

    setSearchParams((prev) => {
      currentPage === initialPagination.currentPage
        ? prev.delete('page')
        : prev.set('page', currentPage.toString())

      perPage === initialPagination.perPage
        ? prev.delete('per_page')
        : prev.set('per_page', perPage.toString())

      sort === null ? prev.delete('sort') : prev.set('sort', sort.toString())

      sortOrder === 'asc'
        ? prev.delete('order')
        : prev.set('order', sortOrder.toString())

      !search ? prev.delete('q') : prev.set('q', search.toString())

      Object.entries(filters).forEach(([key, value]) => {
        const defaultFilter = defaultCategoryFilters[key as CategoryFilter]

        if (Array.isArray(defaultFilter)) {
          _.isEqual(value, defaultFilter) || value.length === 0
            ? prev.delete(key)
            : prev.set(key, value.toString())

          return
        }

        value === defaultFilter
          ? prev.delete(key)
          : prev.set(key, value.toString())
      })

      return prev
    })
  }, [
    filters.formats,
    filters.has_image,
    filters.id,
    sort,
    sortOrder,
    currentPage,
    perPage,
    search,
  ])

  return (
    <div className='w-full h-full'>
      <h1 className='text-4xl font-bold mb-6'>Категории</h1>
      <div className='flex w-full'>
        <div className='space-y-4 w-full'>
          <CategoriesToolbar table={table} columnNames={categoryColumns} />
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
