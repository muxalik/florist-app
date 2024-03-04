import { ChangeEvent } from 'react'
import { Input } from './ui/input'
import Icons from './ui/icons'

interface TableSearchProps {
  search: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const TableSearch = ({ search, onSearch }: TableSearchProps) => {
  return (
    <div className='relative'>
      <Input
        placeholder='Поиск...'
        value={search}
        onChange={onSearch}
        className='h-8 w-[150px] lg:w-[250px] pl-8'
      />
      <Icons.search className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 w-4 h-4' />
    </div>
  )
}

export default TableSearch
