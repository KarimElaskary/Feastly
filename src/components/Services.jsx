import React from 'react'
import { FaUtensils, FaMotorcycle, FaConciergeBell } from 'react-icons/fa'

const Services = () => {
  return (
    <div className='bg-primary py-10 mt-[50px] text-white'>
      <h1 className='text-3xl font-bold text-center mb-8'>Our Services</h1>
      <div className='flex justify-around flex-wrap gap-8 px-4'>

        {/* Online Ordering */}
        <div className='flex flex-col items-center text-center max-w-xs'>
          <FaUtensils className="text-5xl mb-3" />
          <h3 className='font-bold text-lg mb-2'>Online Ordering</h3>
          <p>Order your favorite dishes online quickly and easily through our website.</p>
        </div>

        {/* Home Delivery */}
        <div className='flex flex-col items-center text-center max-w-xs'>
          <FaMotorcycle className="text-5xl mb-3" />
          <h3 className='font-bold text-lg mb-2'>Home Delivery</h3>
          <p>Get hot and fresh meals delivered straight to your doorstep, fast and reliable.</p>
        </div>

        {/* Catering Services */}
        <div className='flex flex-col items-center text-center max-w-xs'>
          <FaConciergeBell className="text-5xl mb-3" />
          <h3 className='font-bold text-lg mb-2'>Catering Services</h3>
          <p>Tailored catering for your events and celebrations with delicious menu options.</p>
        </div>
        
      </div>
    </div>
  )
}

export default Services
