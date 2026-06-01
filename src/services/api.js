import axios from "axios";




class ApiServices {

    #token=localStorage.getItem("token")

    setToken(token){
        this.#token = token
    }


    async signin(loginData){
        const { data } =await axios.post(import.meta.env.VITE_BASE_URL + "/users/signin",loginData)
        return data
    }

    async signup(registerData){
        const { data } =await axios.post(import.meta.env.VITE_BASE_URL +  "/users/signup",registerData)
        return data
    }

    async getPosts(page=1){
        const { data } = await axios.get(import.meta.env.VITE_BASE_URL +  "/posts/feed",{
              headers:{
                token:this.#token
              },
              params:{
                only:"following",
                page,
                limit:3
              }
            })
            return data

    }
    async getDetailsPost(postId){
        const {data} =await axios.get(import.meta.env.VITE_BASE_URL +  "/posts/" + postId , {
                    headers:{
                        token : this.#token
                    }
                })
            return data

    }
    async getCommentsPost(postId , page){
         const {data} =await axios.get(import.meta.env.VITE_BASE_URL +  "/posts/" + postId + "/comments",{
                  headers:{
                    token:this.#token
                  },
                  params:{
                    page,
                    // sort:"-createdAt",
                    limit:3,
                  }
                })
        
            return data

    }

    async getloggedUserData(){
    const {data}=await axios.get(import.meta.env.VITE_BASE_URL +  "/users/profile-data",{
            headers:{
                token:this.#token
            }
        }) 
        
            return data

    }

    async createPost(formData) {

            const { data } = await axios.post(import.meta.env.VITE_BASE_URL +  "/posts",formData,{
                headers:{
                    token:this.#token,
                        }})
                        return data
   
}

    async createComment(postId,formData){
        const {data} = await axios.post(import.meta.env.VITE_BASE_URL +  "/posts/" + postId + "/comments",formData,{
        headers:{
            token:this.#token,
                }})
                return data


}

    async deletePost(postId){
        const {data} = await axios.delete(import.meta.env.VITE_BASE_URL +  "/posts/" + postId,{
            headers:{
                token:this.#token
            }
        })
        return data
    } 

    async deleteComment(postId,commentId){
        const {data} = await axios.delete(import.meta.env.VITE_BASE_URL +  "/posts/" + postId + "/comments/" + commentId,{
            headers:{
                token:this.#token
            }
        })
        return data
    }

    async updatePost(postId,formData){
        const {data} = await axios.put(import.meta.env.VITE_BASE_URL +  "/posts/" + postId,formData,{
            headers:{
                token:this.#token
            }
        })
        return data
    }

    async updateComment(postId,commentId,formData){
        const {data} = await axios.put(import.meta.env.VITE_BASE_URL +  "/posts/" + postId + "/comments/" + commentId,formData,{
            headers:{
                token:this.#token
            }
        })
        return data
    }

    async likePost(postId){
        const {data} = await axios.put(import.meta.env.VITE_BASE_URL +  "/posts/" + postId + "/like",{},{
            headers:{
                token:this.#token
            }
        })
        return data
    }   

    async likeComment(postId,commentId){
        const {data} = await axios.put(import.meta.env.VITE_BASE_URL +  "/posts/" + postId + "/comments/" + commentId + "/like",{},{
            headers:{
                token:this.#token
            }
        })
        return data
    }

    async getUserProfile(userId){
        const {data} = await axios.get(import.meta.env.VITE_BASE_URL +  "/users/" + userId + "/profile",{
            headers:{
                token:this.#token
            }
        })
        return data
    }

    async followUser(userId){
        const {data} = await axios.put(import.meta.env.VITE_BASE_URL +  "/users/" + userId + "/follow",{},{
            headers:{
                token:this.#token
            }
        })
        return data
    }

  async getUserPosts(userId,page=1){
    const {data} = await axios.get(import.meta.env.VITE_BASE_URL +  "/users/" + userId + "/posts",{
        headers:{
            token:this.#token
        },
        params: {
        page,
        limit: 20
      }
    })
    return data
  }
  
  async updateProfile(formData){
    const {data} = await axios.put(import.meta.env.VITE_BASE_URL +  "/users/upload-photo",formData,{
        headers:{
            token:this.#token,
            // "Content-Type":"multipart/form-data"
        }
    })
    return data

  }

  async changePassword(changePasswordData){
    const {data} = await axios.patch(import.meta.env.VITE_BASE_URL +  "/users/change-password",changePasswordData,{
        headers:{
            token:this.#token,
        },
    })
    return data
  }

  async createReply(postId,commentId,formData){
    const {data} = await axios.post(import.meta.env.VITE_BASE_URL +  "/posts/" + postId + "/comments/" + commentId + "/replies",formData,{
        headers:{
            token:this.#token,
                }})
                return data

  }





}

export const apiServices = new ApiServices();