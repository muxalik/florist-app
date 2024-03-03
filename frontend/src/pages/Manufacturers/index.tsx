import { useManufacturers } from './store'
import { useSearchParams } from 'react-router-dom'
import { tagsPagination } from '@/constants/tags/pagination'
import { useEffect } from 'react'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
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
import { defaultTagFilters } from '@/constants/tags/filters'
import { TagFilter } from '@/types/tag'
import { manufacturerColumns } from '@/constants/manufacturers/columns'
import { manufacturersPagination } from '@/constants/manufacturers/pagination'
import { ManufacturerToolbar } from './toolbar'

const Manufacturers = () => {
  const [, setSearchParams] = useSearchParams()

  // const filters = useTagFilters((state) => state.filters)
  const sort = useManufacturers((state) => state.sort)
  const sortOrder = useManufacturers((state) => state.sortOrder)
  const search = useManufacturers((state) => state.search)
  const { currentPage, lastPage, perPage } = useManufacturers(
    (state) => state.pagination
  )

  const manufacturers = useManufacturers((state) => state.manufacturers)
  const isLoading = useManufacturers((state) => state.isLoading)
  const setPage = useManufacturers((state) => state.setPage)
  const setPerPage = useManufacturers((state) => state.setPerPage)
  const fetchManufacturers = useManufacturers(
    (state) => state.fetchManufacturers
  )

  useEffect(() => {
    fetchManufacturers()

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

      // Object.entries(filters).forEach(([key, value]) => {
      //   const defaultFilter = defaultTagFilters[key as TagFilter]

      //   if (Array.isArray(defaultFilter)) {
      //     _.isEqual(value, defaultFilter)
      //       ? prev.delete(key)
      //       : prev.set(key, value.toString())

      //     return
      //   }

      //   value === defaultFilter
      //     ? prev.delete(key)
      //     : prev.set(key, value.toString())
      // })

      return prev
    })
  }, [
    // filters.id,
    // filters.min_name,
    // filters.max_name,
    // filters.min_products,
    // filters.max_products,
    // filters.updated_from,
    // filters.updated_to,
    // filters.created_from,
    // filters.created_to,
    sort,
    sortOrder,
    currentPage,
    perPage,
    search,
  ])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const cols = columns()

  const table = useReactTable({
    data: manufacturers,
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
      <h1 className='text-4xl font-bold mb-6'>Производители</h1>
      <div className='flex w-full'>
        <div className='space-y-4 w-full'>
          <ManufacturerToolbar
            table={table}
            columnNames={manufacturerColumns}
          />
          <DataTable columns={cols} table={table} isLoading={isLoading} />
          <DataTablePagination
            table={table}
            currentPage={currentPage}
            lastPage={lastPage}
            setPage={setPage}
            perPage={perPage}
            defaultPerPage={manufacturersPagination.perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Manufacturers
