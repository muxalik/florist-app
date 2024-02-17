import Icons from '../icons'

const Loader = () => (
  <div className='absolute inset-0 z-10'>
    <div className='relative w-full h-full'>
      <div className='w-full h-full bg-background opacity-75 rounded-sm' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Icons.spinner className='text-primary animate-spin dark:text-gray-600 w-20 h-20' />
      </div>
    </div>
  </div>
)

export default Loader
