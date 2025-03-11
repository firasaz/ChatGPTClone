import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen">
            <span className=' text-xl font-semibold'>404 Not Found</span>
            <Link to='/' className='text-md bg-blue-200 m-0 py-1 px-3 rounded-full hover:bg-blue-300'>Home</Link>
        </div>
    )
}

export default NotFoundPage