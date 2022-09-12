import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit'

import axios from '../../http'

export const fetchUserById = createAsyncThunk<
  UserState,
  string,
  { rejectValue: string }
>('users/fetchUserById', async function (id, { rejectWithValue }) {
  try {
    const { data } = await axios.get(`/auth/get/${id}`)

    return data.user
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const registerUser = createAsyncThunk<
  UserState,
  { username: string; email: string; password: string },
  { rejectValue: string }
>(
  'users/registerUser',
  async function ({ username, email, password }, { rejectWithValue }) {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        password,
        email,
      })

      if (data.token) window.localStorage.setItem('token', data.token)

      if (data.status && data.status !== 200)
        return rejectWithValue(data.message)

      return data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

export const loginUser = createAsyncThunk<
  UserState,
  { email: string; password: string },
  { rejectValue: string }
>('users/loginUser', async function ({ email, password }, { rejectWithValue }) {
  try {
    const { data } = await axios.post('/auth/login', {
      password,
      email,
    })

    if (data.token) window.localStorage.setItem('token', data.token)

    if (data.status && data.status !== 200) return rejectWithValue(data.message)

    return data
  } catch (error: any) {
    console.log(error)
    return rejectWithValue(error.message)
  }
})

export const getMe = createAsyncThunk<UserState>(
  'users/getMe',
  async function () {
    try {
      const { data } = await axios.get('/auth/me')
      return data
    } catch (error: any) {
      console.log(error)
    }
  }
)

export type UserState = {
  _id: string
  username: string
  email: string
  password?: string
  token?: string
}

type UserSliceType = {
  user: UserState | null
  token: string
  loading: boolean
  error: string | null
}

const initialState: UserSliceType = {
  loading: false,
  token: window.localStorage.getItem('token') ?? '',
  user: null,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch by id
      .addCase(fetchUserById.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload

        state.loading = false
        state.error = null
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка...'
      })
      // Register User
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка...'
      })
      // Login User
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token ?? ''
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка...'
      })
      // Get Me
      .addCase(getMe.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false
      })
      // Matcher
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = usersSlice.actions
export default usersSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}
