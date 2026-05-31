import React, { useContext, useState } from 'react'
import {Button, Input} from "@heroui/react";
import commentIcon from "/src/assets/comment-svgrepo-com.svg"
import avatar from "/src/assets/avatar.png"
import { Link, useNavigate } from 'react-router-dom'
import CreateCommentInput from './Post/CreateCommentInput'
import PosttBody from './Post/PosttBody'
import PostHeader from './Post/PostHeader'

import PostFooter from './Post/PostFooter'
import { apiServices } from '../services/api'
import { authContext } from '../contexts/authContext'
import timeAgo from '../helpers/TimeAgo';


export default function Post({post , comments , getPosts}) {
  

    const { userData }= useContext(authContext)
    const [isInEditMode , setIsInEditMode] = useState(false)
    const [isInEditComment , setIsInEditComment] = useState(null)

    const [isUpdating , setIsUpdating] = useState(false)
    
    const [topCommentContent , setTopCommentContent] = useState(post.topComment? post.topComment.content : false)
    const [commentContent , setCommentContent] = useState("")

    const [likes, setLikes] = useState(post.topComment?.likes.length)
    const [isLiked, setIsLiked] = useState(post.topComment?.likes.includes(userData._id))

    const [likesUsers, setLikesUsers] = useState([])
    const [openModal, setOpenModal] = useState(null)
    

    const navigate = useNavigate()

    
  async function addComment(formData) {

    const responce = await apiServices.createComment(post._id,formData)
    if(responce.success){
      await getPosts()
    }
    

  }

  async function deletePost(){

    const responce = await apiServices.deletePost(post._id)
    if(comments){
      console.log();
      
     navigate("/")
    }
    else{
       getPosts()
    }


  }
  async function deleteComment(commentId){


    const responce = await apiServices.deleteComment(post._id,commentId)
    if(responce.success){
      getPosts()
    }
  }  

  async function updataTopComment(){
    setIsUpdating(true)
    const formData = new FormData();
    formData.set("content", topCommentContent);
    const responce = await apiServices.updateComment(post.topComment?.post, post.topComment?._id, formData)
    if(responce.success){
      await getPosts()
      setIsInEditMode(false)
      setIsUpdating(false)

    }
  }

  async function updataComment(comment){
    setIsUpdating(true)
    const formData = new FormData();
    formData.set("content", commentContent);
    const responce = await apiServices.updateComment(comment.post, comment._id, formData)
    if(responce.success){
      await getPosts()
      setIsInEditMode(false)
      setIsUpdating(false)

    }
  }


     async function handleLike() {
    const newLikedState = !isLiked
          setIsLiked(newLikedState)
  
      setLikes(prev => newLikedState ? prev + 1 : prev - 1)
  
      try {
  
          await apiServices.likeComment(post._id, post.topComment?._id)
  
  
      } catch (error) {
        
        setIsLiked(!newLikedState)
        setLikes(likeCount)
      }
    }

      async function getLikesUsers() {
    
        try{
              const users = []
    
        for (const userId of post.topComment?.likes) {
    
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
  <article key={post._id} className="mb-4 break-inside p-6 rounded-xl bg-gray-100 shadow dark:bg-slate-800 flex flex-col bg-clip-border  w-full">

          {/* Post Header */}

          <PostHeader userName={post.user?.name} userId={post.user._id} userPhoto={post.user?.photo} deletePost={deletePost} createdId={post.user._id}  createAt={post.createdAt}/>
            
          {/* Post Body */}

          <PosttBody caption={post.body} image={post.image}/>

          {/* Post Footer */}

          <PostFooter commentsCount={post.commentsCount} post={post} likeCount={post.likesCount}/>

          {/* Create Comment Input */}


          <CreateCommentInput addComment={addComment}/>


          {/* Comments content */}


          {comments? comments.map((comment)=>  <div key={comment._id} className="pt-6">
                    
                    
                        {/* Comment row */}
                        <div className="media flex pb-4">
                          <Link className="mr-4" to={`/users/${comment.commentCreator?._id}/profile`}>
                    
                            <img onError={(e) => e.target.src = avatar} className="rounded-full max-w-none w-12 h-12" src={comment.commentCreator?.photo } />
                          </Link>

                          
                          <div className="media-body grow">

                            <div className='flex justify-between w-full'>
                                   <div>
                                        <Link className="inline-block text-base font-bold mr-2" to={`/users/${comment.commentCreator?._id}/profile`}>{comment.commentCreator?.name}</Link>
                                        <span className="text-slate-500 dark:text-slate-300">{timeAgo(comment.createdAt)}</span>
                                  </div>


                         <div className='flex gap-2'>
                              {(userData?._id == post.topComment?.commentCreator._id) && <button onClick={()=>setIsInEditComment(comment._id)} className=" px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">Edit</button>} 
                              {(userData?._id == post.topComment?.commentCreator._id || userData?._id == post.user._id) && <button onClick={()=>deleteComment(post.topComment?._id)} className=" px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">Delete</button>} 
                        </div>

                            </div>



                {isInEditComment == comment._id ?
                <div>
                 <Input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} /> 

                <div className='flex justify-end gap-2 mt-2'>
                  <button color='primary' onClick={()=>{setIsInEditComment(null); setCommentContent(post.topComment?.content)}} className="  ">Cancel</button>
                  <Button isLoading={isUpdating} color='primary' onPress={()=>updataComment(comment)}  className=" ">Save</Button>
                  
                </div>

                </div>
                 : comment.content && <p>{comment.content}</p> }




                          
                            {comment.image && <img src={comment.image} className='w-1/2 mt-2' alt="Comment image" />}

                            <div className="mt-2 flex items-center">
                              <a className="inline-flex items-center py-2 mr-3" href="#">
                                <span className="mr-2">
                                  <svg className="fill-gray-400 dark:fill-rose-400" style={{width: 22, height: 22}} viewBox="0 0 24 24">
                                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                                    </path>
                                  </svg>
                                </span>
                                <span className="text-base font-bold">{comment.likes.length}</span>
                              </a>
                              <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                                Repply
                              </button>
                            </div>

                          </div>


                        </div>
                    
                    
                        {/* End More comments */}
                      </div>

                       ) : post.topComment && <div className="pt-6">


    {/* Comment row */}
    <div className="media flex pb-4">
      <Link className="mr-4" href="#" to={`/users/${post.topComment?.commentCreator?._id}/profile`}>

        <img onError={(e) => e.target.src = avatar} className="rounded-full max-w-none w-12 h-12" src={post.topComment?.commentCreator?.photo }  />

      </Link>



      <div className="media-body grow">




        <div className='flex justify-between w-full'>

        <div>
          <Link className="inline-block text-base font-bold mr-2" to={`/users/${post.topComment?.commentCreator?._id}/profile`}>
            {post.topComment?.commentCreator?.name}
            </Link>
          <span className="text-slate-500 dark:text-slate-300">{timeAgo(post.topComment?.createdAt)}</span>
        </div>



         <div className='flex gap-2'>
            {(userData._id == post.topComment?.commentCreator._id) && <button onClick={()=>setIsInEditMode(true)} className=" px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">Edit</button>} 
            {(userData._id == post.topComment?.commentCreator._id || userData._id == post.user._id) && <button onClick={()=>deleteComment(post.topComment?._id)} className=" px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">Delete</button>} 
            </div>


            </div>


                {isInEditMode ?
                <div>
                 <Input value={topCommentContent} onChange={(e) => setTopCommentContent(e.target.value)} /> 

                <div className='flex justify-end gap-2 mt-2'>
                  <button color='primary' onClick={()=>{setIsInEditMode(false); setTopCommentContent(post.topComment?.content)}} className="  ">Cancel</button>
                  <Button isLoading={isUpdating} color='primary' onPress={()=>updataTopComment()}  className=" ">Save</Button>
                  
                </div>

                </div>
                 : post.topComment?.content && <p>{post.topComment?.content}</p> }

                 {post.topComment?.image && <img src={post.topComment?.image} className='w-1/2 mt-2' alt="Comment image" />}

                  
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center py-2 mr-3" >
            <button onClick={handleLike} className="mr-2">
              <svg className={isLiked ? "fill-rose-600 dark:fill-rose-400" : "fill-gray-400 dark:fill-gray-300"} style={{width: 22, height: 22}} viewBox="0 0 24 24">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                </path>
              </svg>
            </button>
            <button onClick={getLikesUsers} className="text-base font-bold">{likes}</button>
          </span>
          <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
            Repply
          </button>
        </div>
      </div>
    </div>


          
    

    {/* More comments btn*/}
   

{post.commentsCount>1 && 
   <div className="w-full">
      <Link to={'/posts/' + post._id} href="#" className="py-3 px-4 w-full block bg-slate-200 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
        more comments</Link>
    </div>
}

 




  </div>
}



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






</article>



  )
}
