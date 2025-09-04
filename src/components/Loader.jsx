import React from 'react'

const Loader = () => {
  return ( 
<div className="flex-col gap-4 w-full flex items-center justify-center h-[100vh] ">
  <div className="w-28 h-28 border-8 text-primary text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-primary rounded-full">
  </div>
</div>
  )
}

export default Loader