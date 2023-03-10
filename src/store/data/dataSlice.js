import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth:true,
  authError:'',
  value: 0,
  tiendas:[],
  socketTiendas:[],
  loader:false,
  centralTables: [],
}

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload.auth
    },
    setAuthError:(state, action) => {
      state.authError =  action.payload;
    },
    setTiendas:(state, action) => {
      console.log(action.payload)
      state.tiendas =  action.payload.tiendas
    },
    setSocketTiendas:(state, action) => {
      state.socketTiendas =  action.payload.socketTiendas
    },
    setCentralTables: (state, action) => {
      state.centralTables = action.payload.centralTables
    },
    startLoader:(state) => {
      state.loader = true;
    },
    stopLoader: (state) => {
      state.loader = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setAuth, 
  setAuthError, 
  setTiendas, 
  setCentralTables,
  startLoader, 
  stopLoader, 
  setSocketTiendas  } = dataSlice.actions

