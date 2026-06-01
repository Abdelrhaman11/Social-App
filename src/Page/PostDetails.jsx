import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { authContext } from '../contexts/authContext'
import { Link } from 'react-router-dom'
import {apiServices} from "../services/api"
import LoadingScreen from '../Components/LoadingScreen'
import commentIcon from "/src/assets/comment-svgrepo-com.svg"
import Post from '../Components/Post'
import NotFound from './NotFound'

export default function PostDetails() {

    let { postId } = useParams()
    const [ post , setPost ]= useState(null)
    const [ comments , setcomments ]= useState([])
    const [ statusCode  , setStatusCode ]= useState(null)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(null)

    async function getPost(){

   try{
        const data =await apiServices.getDetailsPost(postId)

       setPost(data.data.post);

   }catch(error){
      setStatusCode(error.status)

   }
      
   
        
    }

    async function getcomments(page){
        const data =await apiServices.getCommentsPost(postId , page)

       setcomments(data.data.comments);
      setPagination(data?.meta?.pagination)

        
    }
 
    useEffect(()=>{
      getPostAndComments(page)
    },[page])

     function getPostAndComments(){

          getPost()
         getcomments(page)
    }




  return (
    <>

    {!post?<LoadingScreen />: statusCode === 404 ? <NotFound title="Post not found"/> : <div className='max-w-2xl mx-auto py-10 grid gap-6'>

        {post && (<Post post={post} comments={comments} getPosts={getPostAndComments} />)}




        <div className='flex justify-center gap-4 py-8'>

              <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)} className='bg-gray-300 px-4 py-2 rounded disabled:opacity-50'>Prev
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

        
    </div>
     }

    </>
       
  )
}
