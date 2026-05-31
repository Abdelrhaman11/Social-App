import React from 'react'

export default function PosttBody({caption , image}) {
  return (
  <>
    <h2 className="text-xl font-medium dark:text-white">
     {caption}
    </h2>

    <div className="py-4">
      <img className="max-w-full rounded-lg" src={image} />
    </div>

  </>
  
)
}
