import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo or App Name */}
        <div className="text-lg font-semibold mb-4 md:mb-0 w-full">
         <p className='text-center'>Feastly &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
