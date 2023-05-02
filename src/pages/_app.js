import '../styles/app.css';
import { AuthProvider } from '../../contexts/AuthContext';
import PrivateRoute from "../../components/privateRoute";
import {useRouter} from "next/router";

const noAuthRequired = [
    '/login',
    '/signup'
]

export default function App({ Component, pageProps }) {

  const router = useRouter()

  return (
    <AuthProvider>
      {
        noAuthRequired.includes(router.pathname)?
            <Component {...pageProps} />
            :
            <PrivateRoute>
              <Component {...pageProps} />
            </PrivateRoute>
      }
    </AuthProvider>
  )
  ;
}