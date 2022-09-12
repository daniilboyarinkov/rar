import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/hook'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../store/slices/UserSlice'
import { FormHelperText } from '@mui/material'
import { toast } from 'react-toastify'

type LoginFormData = {
  email: string
  password: string
}

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = handleSubmit(({ email, password }: LoginFormData) => {
    try {
      dispatch(loginUser({ email, password })).then((data: any) => {
        if (!data.meta.rejectedWithValue) navigate('/', { replace: true })
        else
          return toast.error(data.payload, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
      })
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <LockOutlinedIcon color="primary" sx={{ m: 1 }} />
      <Typography component="h1" variant="h5">
        Войти
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: 'Пароль не может быть пустым',
          })}
        />
        {errors.email && (
          <FormHelperText error={true}>{errors.email.message}</FormHelperText>
        )}
        <TextField
          margin="normal"
          fullWidth
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Пароль не может быть пустым',
          })}
        />
        <FormHelperText error={true}>{errors.password?.message}</FormHelperText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!!errors.email || !!errors.password}
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        <Grid container>
          <Grid item xs={6} textAlign="start">
            <Link href="/recover_password" variant="body2">
              {'Забыли пароль?'}
            </Link>
          </Grid>
          <Grid item xs={6} textAlign="end">
            <Link href="/api/auth/registration" variant="body2">
              {'Ещё не с нами?'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
