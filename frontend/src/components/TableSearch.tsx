import { ChangeEvent } from 'react'
import { Input } from './ui/input'
import Icons from './ui/icons'
import { Button } from './ui/button'

interface TableSearchProps {
  search: string
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
  reset: () => void
}

const TableSearch = ({ search, onSearch, reset }: TableSearchProps) => {
  return (
    <div className='relative'>
      <Icons.search className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 w-4 h-4' />
      <Input
        placeholder='Поиск...'
        value={search}
        onChange={onSearch}
        className='h-8 w-[150px] lg:w-[250px] pl-8 pr-8'
      />
      {search.length > 0 && (
        <Button
          variant={'ghost'}
          className='h-full absolute top-1/2 -translate-y-1/2 right-0 text-gray-500 hover:text-gray-700 w-8 py-2 px-2 cursor-pointer'
          onClick={reset}
        >
          <Icons.close />
        </Button>
      )}
    </div>
  )
}

export default TableSearch
