import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  currentPage: number
  lastPage: number
  setPage: (page: number) => void
  perPage: number
  setPerPage: (page: number) => void
}

export function DataTablePagination<TData>({
  table,
  currentPage,
  lastPage,
  setPage,
  perPage,
  setPerPage,
}: DataTablePaginationProps<TData>) {
  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex items-center justify-between w-full space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Записей на странице</p>
          <Select
            value={perPage.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              setPerPage(+value)
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[150px] items-center justify-center text-sm font-medium'>
          Страница {currentPage} из {lastPage}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPage(1)}
            disabled={currentPage === 1}
          >
            <span className='sr-only'>На первую страницу</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() =>
              setPage(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            disabled={currentPage === 1}
          >
            <span className='sr-only'>На предыдущую страницу</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() =>
              setPage(currentPage < lastPage ? currentPage + 1 : currentPage)
            }
            disabled={currentPage === lastPage}
          >
            <span className='sr-only'>На следущую страницу</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => setPage(lastPage)}
            disabled={currentPage === lastPage}
          >
            <span className='sr-only'>На последнюю страницу</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
