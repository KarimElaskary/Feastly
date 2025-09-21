import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { FaUser, FaEnvelope, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa'

const UserProfile = () => {
  const { user, isLoaded } = useUser()

  // Show loading while user data is being fetched
  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            No user found
          </h2>
          <p className='text-gray-600'>Please sign in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* Header */}
          <div className='bg-primary text-white p-6'>
            <h1 className='text-3xl font-bold'>User Profile</h1>
            <p className='text-primary-100 mt-2'>
              Manage your account information
            </p>
          </div>

          {/* Profile Content */}
          <div className='p-6'>
            <div className='grid md:grid-cols-2 gap-8'>
              {/* Profile Picture and Basic Info */}
              <div className='space-y-6'>
                <div className='text-center'>
                  <div className='w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary'>
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt='Profile'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                        <FaUser className='text-4xl text-gray-400' />
                      </div>
                    )}
                  </div>
                  <h2 className='text-2xl font-bold text-gray-800'>
                    {user.fullName || 'No name set'}
                  </h2>
                  <p className='text-gray-600'>
                    @{user.username || 'No username'}
                  </p>
                </div>

                {/* Account Actions */}
                <div className='space-y-3'>
                  <button className='w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors'>
                    Edit Profile
                  </button>
                  <button className='w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors'>
                    Change Password
                  </button>
                </div>
              </div>

              {/* User Details */}
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                  Account Information
                </h3>

                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <FaEnvelope className='text-primary text-lg' />
                    <div>
                      <p className='text-sm text-gray-600'>Email Address</p>
                      <p className='font-medium'>
                        {user.primaryEmailAddress?.emailAddress || 'No email'}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <FaCalendarAlt className='text-primary text-lg' />
                    <div>
                      <p className='text-sm text-gray-600'>Member Since</p>
                      <p className='font-medium'>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : 'Unknown'}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <FaUser className='text-primary text-lg' />
                    <div>
                      <p className='text-sm text-gray-600'>User ID</p>
                      <p className='font-medium text-sm font-mono'>{user.id}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className='pt-4 border-t border-gray-200'>
                  <h4 className='font-semibold text-gray-800 mb-2'>
                    Account Status
                  </h4>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
