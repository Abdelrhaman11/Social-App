import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import { authContext } from '../contexts/authContext'
import commentIcon from "/src/assets/comment-svgrepo-com.svg"
import avatar from "/src/assets/avatar.png"
import { Avatar, Spinner } from '@heroui/react'
import { Link } from 'react-router-dom'
import { apiServices } from '../services/api'
import Post from '../Components/Post'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
import { useQuery } from '@tanstack/react-query'

export default function Feed() {

// const {userToken} = useContext(authContext)
// const [isLoading, setIsLoading] = useState(false)

const [page, setPage] = useState(1)
// const {data: posts = [] , isLoading , refetch , isFetching} = useQuery({
//   queryKey : ["posts", page],
//   queryFn :() => apiServices.getPosts(page),
//   select: (data) => data.data.posts
// }

// )

const {
  data,
  isLoading,
  refetch,
  isFetching
} = useQuery({
  queryKey: ["posts", page],

  queryFn: () => apiServices.getPosts(page),
})

 
const posts = data?.data?.posts || []

const pagination = data?.meta?.pagination


// const [posts , setPosts] = useState([])



//   async function getPosts() {
    // setIsLoading(true)

//     const data = await apiServices.getPosts()

//     setPosts(data.data.posts);

      // setIsLoading(false)
     
//   }

//   useEffect(()=>{

//     getPosts()

//   },[])
  


  return (
    <>
    <div>
        <div >
          {isFetching && !isLoading && <div className='px-8 py-2 bg-white shadow rounded-4xl w-fit absolute start-1/2 -translate-x-1/2'><Spinner/></div>}
         <CreatePost getPosts={refetch}/>

    {posts.length > 0 ? <div className='max-w-xl mx-auto py-10 grid gap-6'>

      {posts.map((post)=><Post key={post._id} post={post} getPosts={refetch}/>)}



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



    </div> : <LoadingScreen/>}
   
    
    </div>
    </div>




         {/* <CreatePost getPosts={getPosts}/>

    {posts.length > 0 ? <div className='max-w-xl mx-auto py-10 grid gap-6'>

      {posts.map((post)=><Post key={post._id} post={post} getPosts={getPosts}/>)}

    </div> : <LoadingScreen/>} */}


    
    
    </>

  )

  
}


