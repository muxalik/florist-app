import { useCategories } from './store'
import { useSearchParams } from 'react-router-dom'
import { categoriesPagination } from '@/constants/categories/pagination'
import { defaultCategoryFilters } from '@/constants/categories/filters'
import { CategoryFilter } from '@/types/category'
import { useCategoryFilters } from './filters/store'
import { useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { categoryColumns } from '@/constants/categories/columns'
import { useState } from 'react'
import {
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'
import { DataTablePagination } from '@/components/ui/data-table/pagination'
import _ from 'lodash'
import { CategoryToolbar } from './toolbar'

const Categories = () => {
  const [, setSearchParams] = useSearchParams()

  const filters = useCategoryFilters((state) => state.filters)
  const sort = useCategories((state) => state.sort)
  const sortOrder = useCategories((state) => state.sortOrder)
  const search = useCategories((state) => state.search)
  const { currentPage, lastPage, perPage } = useCategories(
    (state) => state.pagination
  )

  const categories = useCategories((state) => state.categories)
  const isLoading = useCategories((state) => state.isLoading)
  const setPage = useCategories((state) => state.setPage)
  const setPerPage = useCategories((state) => state.setPerPage)
  const fetchCategories = useCategories((state) => state.fetchCategories)

  useEffect(() => {
    fetchCategories()

    setSearchParams((prev) => {
      currentPage === categoriesPagination.currentPage
        ? prev.delete('page')
        : prev.set('page', currentPage.toString())

      perPage === categoriesPagination.perPage
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
          _.isEqual(value, defaultFilter)
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
    filters.id,
    filters.has_image,
    filters.formats,
    filters.min_name,
    filters.max_name,
    filters.parent_min,
    filters.parent_max,
    filters.updated_from,
    filters.updated_to,
    filters.created_from,
    filters.created_to,
    sort,
    sortOrder,
    currentPage,
    perPage,
    search,
  ])

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

  return (
    <div className='w-full h-full'>
      <h1 className='text-4xl font-bold mb-6'>Категории</h1>
      <div className='flex w-full'>
        <div className='space-y-4 w-full'>
          <CategoryToolbar table={table} columnNames={categoryColumns} />
          <DataTable columns={cols} table={table} isLoading={isLoading} />
          <DataTablePagination
            table={table}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            perPage={perPage}
            defaultPerPage={categoriesPagination.perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Categories
