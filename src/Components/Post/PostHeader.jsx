import React, { useContext } from 'react'
import { authContext } from '../../contexts/authContext'
import { Link } from 'react-router-dom'
import timeAgo from '../../helpers/TimeAgo'

export default function PostHeader({ userName, userPhoto, createAt , createdId , deletePost ,userId}) {

    const { userData }= useContext(authContext)


    
    
  return (
    <>

    
              {/* Post Header */}
       

     <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <Link className="inline-block mr-4" to={`/users/${userId}/profile`}>
            <img onError={(e) => e.target.src = avatar} className="rounded-full max-w-none w-12 h-12 object-cover" src={userPhoto} />
          </Link>
          <div className="flex flex-col">
            <div>
              <Link className="inline-block text-lg font-bold dark:text-white" to={`/users/${userId}/profile`}>
                {userName}
              </Link>
            </div>
            <div className="text-slate-500 dark:text-slate-300">
              {timeAgo(createAt)}
              
            </div>
          </div>
        </div>
        {createdId == userData._id && <div>
          <button className='text-red-500' onClick={deletePost}>Delete</button>
        </div>}

      </div>


            
          
    

    </>
  )
}
