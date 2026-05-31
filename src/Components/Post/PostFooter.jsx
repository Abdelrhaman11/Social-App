import React, { useContext, useState } from 'react'
import avatar from "/src/assets/avatar.png"
import commentIcon from "/src/assets/comment-svgrepo-com.svg"
import { apiServices } from '../../services/api'
import { authContext } from '../../contexts/authContext'
import { Link } from 'react-router-dom'

export default function PostFooter({commentsCount , likeCount , post }) {
  const { userData } = useContext(authContext)

const [isLiked, setIsLiked] = useState(post.likes.includes(userData._id))
const [likes, setLikes] = useState(likeCount)
const [likesUsers, setLikesUsers] = useState([])
const [openModal, setOpenModal] = useState(null)


    async function handleLike() {
  const newLikedState = !isLiked
        setIsLiked(newLikedState)

    setLikes(prev => newLikedState ? prev + 1 : prev - 1)

    try {

        await apiServices.likePost(post._id)


    } catch (error) {
      
      setIsLiked(!newLikedState)
      setLikes(likeCount)
    }
  }


  async function getLikesUsers() {

    try{
          const users = []

    for (const userId of post.likes) {

      const data = await apiServices.getUserProfile(userId)

      users.push(data.data.user)

    }
   
      setLikesUsers(users)
      setOpenModal("likes")

    }catch(error){
          console.log(error)
    }

  }



  return (

    <>
             {/* Post Footer */}
    
    
      <div className="py-4 flex gap-5">
        
        <span className="inline-flex items-center" >
          <button onClick={handleLike} className="mr-2">
            <svg className={isLiked ? "fill-rose-600 dark:fill-rose-400" : "fill-gray-400 dark:fill-gray-300"} style={{width: 24, height: 24}} viewBox="0 0 24 24">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
              </path>
            </svg>
          </button>
          <button onClick={getLikesUsers} className="text-lg font-bold ">{likes}</button>
        </span>
    
        <Link to={'/posts/' + post._id} className="inline-flex items-center">
          <span className="mr-2">
              <img src={commentIcon} className='w-5' alt="" />
          </span>
          <span className="text-lg font-bold">{commentsCount}</span>
        </Link>
      </div>


{
  openModal && (

    <div onClick={() => setOpenModal(null)} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white md:w-[400px] rounded-2xl p-5 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold capitalize">
            {openModal}
          </h2>

          <button
            onClick={() => setOpenModal(null)}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>

        </div>

        {/* List */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto">

          {
            likesUsers.map((user) => (

              <Link to={`/users/${user._id}/profile`}
                key={user._id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
              >

                <img
                  src={user.photo || avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold">
                    {user.name}
                  </h3>
                </div>

              </Link>

            ))
          }

        </div>

      </div>

    </div>

  )
}





    </>

  )
}
