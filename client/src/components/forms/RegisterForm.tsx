import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/hook'
import { toast } from 'react-toastify'
import { registerUser } from '../../store/slices/UserSlice'
import { useNavigate } from 'react-router-dom'
import { FormHelperText } from '@mui/material'

type RegisterFormData = {
  username: string
  email: string
  password: string
}

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(
    ({ username, email, password }: RegisterFormData) => {
      try {
        dispatch(registerUser({ username, email, password })).then(
          (data: any) => {
            if (!data.meta.rejectedWithValue)
              return navigate('/', { replace: true })
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
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
  )

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <LockOutlinedIcon color="primary" sx={{ m: 1 }} />
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Имя"
          autoComplete="off"
          autoFocus
          {...register('username', {
            required: 'Поле Имя не может быть пустым',
            minLength: {
              value: 2,
              message: 'Имя не может быть короче 2 символов...',
            },
          })}
        />
        {errors.email && (
          <FormHelperText error={true}>
            {errors.username?.message}
          </FormHelperText>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          autoComplete="email"
          {...register('email', {
            required: 'Email не может быть пустым',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
        />
        {errors.email && (
          <FormHelperText error={true}>{errors.email.message}</FormHelperText>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Пароль"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Пароль не может быть пустым',
            minLength: {
              value: 5,
              message: 'Пароль не может быть короче 5 символов...',
            },
          })}
        />
        {/* Password Errors handling */}
        {errors.password && (
          <FormHelperText error={true}>
            {errors.password.message}
          </FormHelperText>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!!errors.email || !!errors.username || !!errors.password}
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Link href="/api/auth/login" variant="body2">
          {'Уже с нами?'}
        </Link>
      </Box>
    </Container>
  )
}
