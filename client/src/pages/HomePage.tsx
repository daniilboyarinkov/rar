import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hook'
import { RootState } from '../store'
import { fetchUserById } from '../store/slices/UserSlice'

const HomePage = () => {
  const dispatch = useAppDispatch()

  const { loading, user } = useAppSelector(
    (state: RootState) => state.userReducer
  )

  useEffect(() => {
    dispatch(fetchUserById('630887888881e7e14d85cfd4'))
  }, [dispatch])

  if (loading) return <div>Loading...</div>

  return (
    <>
      <div>{user?.email}</div>
    </>
  )
}

export default HomePage
