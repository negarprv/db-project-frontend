import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const BASE_URL = "http://localhost:4000/auth"

const initialState = {
  authenticated: false,
  user: null,
  loading: false,
  isLoggingOut: false,
  initial_load : true
}


export const isLoggedIn = createAsyncThunk("auth/getUser", async () => {
  const response = await axios.get(BASE_URL +"/get-user")
  return response.data
})


export const logOut = createAsyncThunk("auth/logOut", async () => {
  const response = await axios.get(BASE_URL +"/logout")
  return response.data
})


export const login = createAsyncThunk("auth/login", async (crudentials) => {
  const {identifier, password} = crudentials
  const response = await axios.post(BASE_URL +"/sign-in", { identifier, password })
  return response.data
}, {
  serializeError: (err) => {
    console.log(err )
    return { message: err.response.data.message[0], code: err.response.status }
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout: (state) => {
    //   delete axios.defaults.headers.common['Authorization']
    //   state.user = null
    //   state.authenticated = false
    //   state.loading = false
    // },
    // loginFromStorage: (state, action: PayloadAction<string>) => {
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
    //   state.authenticated = true
    //   state.loading = false
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true
      state.initial_load = false
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.authenticated = true
      state.initial_load = false
      state.user = action.payload.user
    })

    builder.addCase(login.rejected, (state, action) => {
      state.user = null
      state.authenticated = false
      state.loading = false
      state.initial_load = false
      console.log(action.error.message || "something went wrong")
    })

    builder.addCase(isLoggedIn.pending, (state) => {
      state.initial_load = true
    })
    builder.addCase(isLoggedIn.fulfilled, (state, action) => {
      state.initial_load = false
      state.authenticated = true
      state.user = action.payload
      state.loading = false
    })
    builder.addCase(isLoggedIn.rejected, (state) => {
      state.user = null
      state.authenticated = false
      state.initial_load = false
      state.loading = false
    })

    builder.addCase(logOut.pending, (state) => {
      state.initial_load = false
      state.loading = true
    })
    builder.addCase(logOut.fulfilled, (state) => {
      state.initial_load = false
      state.authenticated = false
      state.user = null
      state.loading = false
    })
    builder.addCase(logOut.rejected, (state) => {
      state.initial_load = false
      state.authenticated = false
      state.user = null
      state.loading = false
    })

  }
})