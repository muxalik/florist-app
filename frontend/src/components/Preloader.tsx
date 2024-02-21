import Icons from "./ui/icons"

const Preloader = () => {
  return (
    <div className='w-screen h-screen bg-background flex items-center justify-center'>
      <Icons.spinner className='text-primary animate-spin dark:text-primary w-20 h-20' />
    </div>
  )
}

export default Preloader
