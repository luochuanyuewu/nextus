export default function Loader() {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-opacity-40'>
      <div role='status'>
        <span className='loading loading-spinner loading-lg text-secondary opacity-50'></span>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}
