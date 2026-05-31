import {useState} from "react";
import { apiServices } from "../services/api";
// import { apiServices } from "../services/api";


export default function CreatePost({ getPosts }) {
    
    const [caption , setCaption] = useState('')
    const [image , setImage] = useState(null)
    const [imagePreview , setImagePreview] = useState(null)
    const [loading , setLoading] = useState(false)
    const [showForm , setShowForm] = useState(false)



     async function handleImageChange(e){ 
        

            if(e.target.files[0]){
                setImage(e.target.files[0])
                
                const imgSrc = URL.createObjectURL(e.target.files[0])

                setImagePreview(imgSrc)
            }
            
    }
    async function handleSubmit (e){
        
        e.preventDefault()
        setLoading(true)

        const formData = new FormData();
        if(image){
         formData.set("image", image);

        }
        if(caption){
             formData.set("body", caption);

        }
       

        const response = await apiServices.createPost(formData)

        console.log(response);
        if(response.success)
        {

            removeImage()
            setCaption('')
            setShowForm(false)
            getPosts()

        }

            setLoading(false)

    }

    function removeImage() {
           setImage(null) ;
           setImagePreview(null);
           document.getElementById('imageInput').value = null;
        
    }
    




    return (

        <div className="bg-white p-6 rounded-lg shadow-md my-10 max-w-xl mx-auto ">
            {!showForm ? (
                <button onClick={()=>setShowForm(true)} className="w-full px-4 py-3  text-left text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg  transition duration-200">
                                     What's on your mind? Shara a post...
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="What's on your mind?" />
                    </div>



                    {imagePreview && (
                        <div className="relative">
                            <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover rounded-lg" />
                            <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}


                    {/* Action Button */}

                    <div className="flex items-center justify-between">


                        <div className="flex items-center space-x-3">

                            {/* Image Upload Botton */}
                        <label htmlFor="imageInput" className="cursor-pointer px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-300 hover:text-blue-600 transition duration-200   ">
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageInput" disabled={loading} />
                        <div className="flex items-center space-x-2">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l14.586-4.586a2 2 0 010 2.828L4 16z" />
                            </svg>
                            <span className="text-sm font-medium">Photo</span>
                        </div>
                        </label>

                        </div>


                        <div className="flex item-center space-x-2">
                            <button type="submit" disabled={loading || (!caption.trim() && !image)} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed  transition duration-200 flex items-center justify-center">
                                {loading ? (<span className="flex items-center space-x-2">

                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"  strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                </svg> 
                                    <span>Posting...</span>
                                 </span>) : 'Post'}


                            </button>
                                <button type="button" onClick={()=>setShowForm(false)} disabled={loading} className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:text-gray-800 hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Cancel
                                </button>

                        </div>
                    </div>

                </form>
            )}
        </div>

        
    )
















}

