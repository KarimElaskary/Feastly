import React from 'react'

const ContactUs = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Contact Us</h2>
        
        <form className="space-y-6 text-primary">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 outline-0 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 outline-0 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-primary">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 outline-0 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary hover:bg-white hover:text-primary text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
