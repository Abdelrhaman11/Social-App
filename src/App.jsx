
import './App.css'
import { HeroUIProvider , ToastProvider } from '@heroui/react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './Layouts/MainLayout.jsx'
import Feed from './Page/Feed.jsx'
import Profile from './Page/Profile.jsx'
import NotFound from './Page/NotFound.jsx'
import AuthLayout from './Layouts/AuthLayout.jsx'
import Signup from './Page/Signup.jsx'
import SignIn from './Page/SignIn.jsx'
import ChangePassword from './Page/ChangePassword.jsx'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes.jsx'
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute.jsx'
import AuthContextProvider from './contexts/authContext.jsx'
import PostDetails from './Page/PostDetails.jsx'
import { QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {


let router = createBrowserRouter([
  {path:"",element:<MainLayout/>,children:[
      {index:true,element:<ProtectedRoutes><Feed/></ProtectedRoutes>},
      {path:"posts/:postId",element:<ProtectedRoutes><PostDetails/></ProtectedRoutes>},
      {path:"users/:userId/profile",element:<ProtectedRoutes><Profile/></ProtectedRoutes>},
      {path:"users/change-password",element:<ProtectedRoutes><ChangePassword/></ProtectedRoutes>},
      {path:"*",element:<NotFound/>}

    ]
  },
  {path:"",element:<AuthLayout/>,children:[
      {path:"signup",element:<ProtectedAuthRoute><Signup/></ProtectedAuthRoute>},
      {path:"signin",element:<ProtectedAuthRoute><SignIn/></ProtectedAuthRoute>},
    ]
  },
])



  return (
    <>

    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthContextProvider>



          <HeroUIProvider>
          <ToastProvider />

          <RouterProvider router={router}/>

        </HeroUIProvider>



      </AuthContextProvider>
        
        </QueryClientProvider>

    </>
  )
}

export default App
