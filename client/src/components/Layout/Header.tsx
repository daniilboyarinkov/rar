import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { logout } from '../../store/slices/UserSlice'
import { toast } from 'react-toastify'
import { RootState } from '../../store'

export default function Header() {
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector((state: RootState) =>
    Boolean(state.userReducer.token)
  )

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              New Project...
            </Link>
          </Typography>
          <Button color="inherit" onClick={isAuth ? logoutHandler : void 0}>
            {isAuth ? (
              <Link to="/" style={{ color: 'inherit' }}>
                Выйти
              </Link>
            ) : (
              <Link to="/api/auth/login" style={{ color: 'inherit' }}>
                <LoginRoundedIcon fontSize="large" />
              </Link>
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
