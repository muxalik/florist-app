import { FC } from 'react'
import { Button } from './ui/button'
import Icons from './ui/icons'

interface FiltersWrapperProps {
  filters: FC[]
  haveChanged: boolean
  reset: () => void
}

const Filters = ({
  filters,
  haveChanged,
  reset,
}: FiltersWrapperProps) => {
  return (
    <ul className='flex flex-wrap gap-2'>
      {filters.map((Filter, id) => (
        <li key={id}>
          <Filter />
        </li>
      ))}
      {haveChanged && (
        <Button
          variant={'link'}
          onClick={reset}
          size={'sm'}
          className='underline'
        >
          <span>Сбросить все</span>
          <Icons.close className='ml-1 w-4 h-4' />
        </Button>
      )}
    </ul>
  )
}

export default Filters
