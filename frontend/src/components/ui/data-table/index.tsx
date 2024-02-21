import { ColumnDef, Table as TanTable, flexRender } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Loader from './loader'

interface BaseTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
}

type DataTableProps<TData, TValue> = {
  isLoading: boolean
  columns: ColumnDef<TData, TValue>[]
  table: TanTable<TData>
} & BaseTableProps<TData, TValue>

export function DataTable<TData, TValue>({
  columns,
  isLoading,
  table,
}: DataTableProps<TData, TValue>) {
  return (
    <div className='rounded-md border relative'>
      {isLoading && <Loader />}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                Ничего не найдено.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
