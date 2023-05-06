import '@/styles/app.css'
import AuthContext from '../../contexts/AuthContext'
import {useRouter} from "next/router";
import ProtectedRoute from "../../components/protectedRoute";

const noAuthRequired = [
    '/login',
    '/signup'
]
export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (

  <AuthContext>
    {
      noAuthRequired.includes(router.pathname)?
          <Component {...pageProps} />:
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
    }

    
  </AuthContext>
  )
}
