import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth:false,
  authError:'',
  value: 0,
  tiendas:[],
  socketTiendas:[],
  loader:false,
  centralTables: [],
  flagTiendas : false,
  countDisconnected: 0,
  logConnection:[],
  serverDisconnected:false
}

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log(action.payload)
      state.auth = action.payload.auth
    },
    setAuthError:(state, action) => {
      state.authError =  action.payload;
    },
    setTiendas:(state, action) => {
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
    setFlagTiendas: (state, action) =>{
      state.flagTiendas = action.payload.flagTiendas;
    },
    setCountDisconnect : (state, action) =>{
      state.countDisconnected = action.payload.countDisconnected;
    },
    setLogConnection : (state, action) =>{
      state.logConnection = action.payload
    },
    setServerDisconnected: (state, action) => {
      state.serverDisconnected =  action.payload.serverDisconnected
    }
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
  setSocketTiendas,
  setFlagTiendas,
  setCountDisconnect,
  setLogConnection,
  setServerDisconnected
} = dataSlice.actions

