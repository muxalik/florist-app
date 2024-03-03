import { useTags } from './store'
import { useSearchParams } from 'react-router-dom'
import { tagsPagination } from '@/constants/tags/pagination'
import { useTagFilters } from './filters/store'
import { useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { tagColumns } from '@/constants/tags/columns'
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
import { TagToolbar } from './toolbar'
import { defaultTagFilters } from '@/constants/tags/filters'
import { TagFilter } from '@/types/tag'

const Tags = () => {
  const [, setSearchParams] = useSearchParams()

  const filters = useTagFilters((state) => state.filters)
  const sort = useTags((state) => state.sort)
  const sortOrder = useTags((state) => state.sortOrder)
  const search = useTags((state) => state.search)
  const { currentPage, lastPage, perPage } = useTags(
    (state) => state.pagination
  )

  const tags = useTags((state) => state.tags)
  const isLoading = useTags((state) => state.isLoading)
  const setPage = useTags((state) => state.setPage)
  const setPerPage = useTags((state) => state.setPerPage)
  const fetchTags = useTags((state) => state.fetchTags)
  const fetchColors = useTags((state) => state.fetchColors)

  useEffect(() => {
    fetchTags()
    fetchColors()

    setSearchParams((prev) => {
      currentPage === tagsPagination.currentPage
        ? prev.delete('page')
        : prev.set('page', currentPage.toString())

      perPage === tagsPagination.perPage
        ? prev.delete('per_page')
        : prev.set('per_page', perPage.toString())

      sort === null ? prev.delete('sort') : prev.set('sort', sort.toString())

      sortOrder === 'asc'
        ? prev.delete('order')
        : prev.set('order', sortOrder.toString())

      !search ? prev.delete('q') : prev.set('q', search.toString())

      Object.entries(filters).forEach(([key, value]) => {
        const defaultFilter = defaultTagFilters[key as TagFilter]

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
    filters.min_name,
    filters.max_name,
    filters.without_color,
    filters.colors,
    filters.min_products,
    filters.max_products,
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
    data: tags,
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
      <h1 className='text-4xl font-bold mb-6'>Теги</h1>
      <div className='flex w-full'>
        <div className='space-y-4 w-full'>
          <TagToolbar table={table} columnNames={tagColumns} />
          <DataTable columns={cols} table={table} isLoading={isLoading} />
          <DataTablePagination
            table={table}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            perPage={perPage}
            defaultPerPage={tagsPagination.perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Tags
