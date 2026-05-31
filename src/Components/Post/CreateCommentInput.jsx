import React, { useState } from 'react'

export default function CreateCommentInput({addComment}) {
    const [comment , setComment] = useState('')
    const [isLoading , setIsLoading] = useState(false)

      const [image, setImage] = useState(null);

        async function handleCreateComment() {
          setIsLoading(true)

            const formData = new FormData()
            formData.set("content", comment)
            if (image) {
              formData.append("image", image);
            }

            await addComment(formData)
             await setComment("");
             await setImage(null);
             setIsLoading(false)

        }
    
  return (
    <>
    <div className='mt-3'>

      
      <div className="relative">
    <input onChange={(e) => setComment(e.target.value)} className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20" type="text" placeholder="Write a comment" />
    <span className="flex absolute right-3 top-2/4 -mt-3 items-center">

      <svg className="" style={{width: 26, height: 26}} viewBox="0 0 24 24">
        <path fill="currentColor" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
        </path>
      </svg>

      <label className="cursor-pointer mx-2">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-slate-500 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4-4a2 2 0 012.828 0L16 17m-2-2l1.172-1.172a2 2 0 012.828 0L20 16m-6-8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>

      <button className='disabled:cursor-not-allowed ' onClick={handleCreateComment} disabled={isLoading || comment.trim() === "" && !image}>
        <svg className="fill-blue-500 dark:fill-slate-50 " style={{width: 24, height: 24}} viewBox="0 0 24 24">
        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
      </svg>
      </button>


   

      {image && (
         <div className="mb-2 relative inline-block">
        <img
          src={URL.createObjectURL(image)}
          alt=""
          className="w-24 h-24 object-cover rounded-lg border"
        />
                 <button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs">✕</button>
        </div>
      )}
      
    </span>
  </div>



    </div>

    </>
  )
}
