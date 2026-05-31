import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { apiServices } from '../services/api'
import avatar from "/src/assets/avatar.png"
import { authContext } from '../contexts/authContext'
import { Link, useParams } from 'react-router-dom'
import LoadingScreen from '../Components/LoadingScreen'
import Post from '../Components/Post'



export default function Profile() {

    let { userId } = useParams()
    const {  userData , setUserData  } = useContext(authContext)
    const [userProfile, setUserProfile] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loading, setLoading] = useState(false)


    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)


    const isFollowing = userProfile?.followers?.some(
    (follower) => follower._id === userData._id
)

  const isOwner = userData?._id === userId

async function getUserProfile() {
  setLoadingProfile(true)
  try {
    const data = await apiServices.getUserProfile(userId)

    // console.log(data.data.user)

    setUserProfile(data.data.user)

  } catch (error) {
    console.log(error)
  }
   finally {

      setLoadingProfile(false)

    }
}


async function handleFollow() {

  try {

    await apiServices.followUser(userId)

    if (isFollowing) {

      // unfollow
      setUserProfile((prev) => (
        {
        ...prev,

        followers: prev.followers.filter(
          (follower) => follower._id !== userData._id
        ),

        followersCount: prev.followersCount - 1,
      }))

    } else {

      // follow
      setUserProfile((prev) => ({
        ...prev,

        followers: [...prev.followers, userData],

        followersCount: prev.followersCount + 1,
      }))

    }

  } catch (error) {

    console.log(error)

  }

}

async function getUserPosts(page) {
    setLoading(true)

  try {

    const data = await apiServices.getUserPosts(userId, page)

    setUserPosts(data.data.posts)
    setPagination(data.meta.pagination)
    
  } 
  catch (error) {
    console.log(error)
  } 
   finally {

      setLoading(false)
    }
  

}


async function handlePhotoChange(e) {
  setLoading(true)

    const file = e.target.files[0]

    if (!file) return

    const formData = new FormData()

    formData.set("photo", file)

    try {

      const { data } = await apiServices.updateProfile(formData)
      console.log(data)
      setUserProfile((prev) => ({
        ...prev,
        photo: data.photo
      }))

          await getUserPosts()

    setUserData((prev) => ({
  ...prev,
  photo: data.photo
}))


    } catch (error) {

      console.log(error)

    }finally{
      setLoading(false)
    }



  }


    useEffect(() => {
  if (userId) {
    getUserProfile()
    getUserPosts(page)
  }
}, [userId, page])


useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}, [userId])




  return (

    <>
      {!loadingProfile ? <div className="bg-gray-100 min-h-screen py-10 px-2">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl w-full md:w-[70%] mx-auto overflow-hidden">

          {/* Cover Section */}
          <div className="relative h-80">

            {/* Cover Image */}
        <div className="h-60 bg-gray-200 flex items-center justify-center overflow-hidden">
  <img src={userProfile?.cover || avatar} alt="Cover" className="w-full h-full object-cover object-top"

  />

</div>

            {/* Profile Image */}
            {!loading?
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 ">
              <img src={userProfile?.photo || avatar} alt="Profile" className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"/>

                {/* Change Profile Photo */}
                    {
                      isOwner &&(
                        

                        <label className="absolute bottom-2 right-2 bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-black transition-all">

                          ✎

                          <input
                            type="file"
                            className="hidden"
                            onChange={handlePhotoChange}
                          />

                        </label>

                      )
                    }


            </div>:<LoadingScreen/>
            }
       

          </div>

          {/* Content */}
          <div className="pt-10 pb-8 px-6 text-center">

            {/* Name */}
            <div className="flex items-center justify-center">

              <h2 className="text-3xl font-bold text-gray-800">
                {userProfile?.name}
              </h2>
       

            </div>


            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Stats */}
            <div className="flex justify-around text-gray-700">

              <div onClick={() => setOpenModal("followers")} className="cursor-pointer">
                <h3 className="font-bold text-2xl">{userProfile?.followersCount}</h3>
                <p className="text-sm text-gray-500">Followers</p>
              </div>


              {!isOwner?

                     <button onClick={handleFollow} className={`px-6 py-2 rounded-lg text-white transition-all
                  ${
                     isFollowing
                     ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-blue-500 hover:bg-blue-600"
                       }`} >

                      {isFollowing ? "Following" : "Follow"}

                            </button> :""}

  

              <div onClick={() => setOpenModal("following")} className="cursor-pointer">
                <h3 className="font-bold text-2xl">{userProfile?.followingCount}</h3>
                <p className="text-sm text-gray-500">Following</p>
              </div>

            

            </div>

          </div>

        </div>

      </div>:<LoadingScreen/>}


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
            userProfile?.[openModal]?.map((user) => (

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




{!loading? <div  className='max-w-xl mx-auto py-10 grid gap-6'>

      {userPosts?.map((post)=><Post key={post._id} post={post} getPosts={getUserPosts}/>)}

      <div className='flex justify-center gap-4 py-8'>

  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
    className='bg-gray-300 px-4 py-2 rounded disabled:opacity-50'
  >
    Prev
  </button>

  <span className='font-bold'>
    Page {pagination?.currentPage}
  </span>

  <button
    disabled={!pagination?.nextPage}
    onClick={() => setPage((prev) => prev + 1)}
    className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
  >
    Next
  </button>

</div>

    </div> : ""}





    </>

  )
}