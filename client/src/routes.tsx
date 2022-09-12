import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RecoverPasswordPage from './pages/RecoverPasswordPage'

const AppRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/api/auth/registration" element={<RegisterPage />} />
    <Route path="/api/auth/login" element={<LoginPage />} />
    <Route path="/recover_password" element={<RecoverPasswordPage />} />
  </Routes>
)

export default AppRoutes
