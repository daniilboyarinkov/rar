import { useEffect } from 'react'

import AppRoutes from './routes'
import Header from './components/Layout/Header'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch } from './store/hook'
import { getMe } from './store/slices/UserSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
