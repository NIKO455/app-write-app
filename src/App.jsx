import { useEffect, useState } from 'react'
import { Header, Footer } from './components/index'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'

export default function App() {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUserInfo()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div>
      <Header />
      <main>
        {/* TODO: <Outlet/> */}
      </main>
      <Footer />
    </div>

  ) : null

}

