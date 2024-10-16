import { SDKZeus } from "../../SDK/SDKZeus";
import {
  setCentralTables,
  setFlagTiendas,
  setLogConnection,
  setTiendas,
  startLoader,
  stopLoader,
  setCountDisconnect,
  setAuthError,
  setAuth,
} from "./dataSlice";

export const getAllPOS = () => {
  return async (dispatch, getState) => {
    dispatch(startLoader());
    try {
      const { data } = await SDKZeus.getAllPOS();
      dispatch(setTiendas({ tiendas: data.data }));
      if (data?.data?.length > 0) {
        dispatch(setFlagTiendas({ flagTiendas: true }));
      }
      await dispatch(stopLoader());
    } catch (err) {
      console.log(err);
      await dispatch(stopLoader());
    }
  };
};

export const getCentralTables = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoader());
    try {
      const { data } = await SDKZeus.getAllTables(id);
      dispatch(setCentralTables({ centralTables: data.data.data }));
      await dispatch(stopLoader());
    } catch (error) {
      console.log(error);
      await dispatch(stopLoader());
    }
  };
};
export const getYesterdayTables = (id) => {
  return async (dispatch, getState) => {
    try {
    } catch (error) {}
  };
};

export const updatePOSL = (data) => {
  return async (dispatch, getState) => {
    dispatch(setTiendas({ tiendas: data }));
  };
};

export const getCentralLogConnection = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await SDKZeus.getLogConnection();
      dispatch(setLogConnection(data.data));
      dispatch(setCountDisconnect({ countDisconnected: data.data.length }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const asyncLogin = ({ username, password }) => {
  return async (dispatch, getState) => {
    dispatch(startLoader());
    try {
      const { data } = await SDKZeus.setLogin({ username, password });
      // console.log(data);
      if (data) {
        localStorage.setItem("@userSQK", true);
        dispatch(setAuth({ auth: true }));
        dispatch(setAuthError({ authError: "" }));
      }
    } catch (err) {
      console.log(err);
      dispatch(setAuthError({ authError: err.message }));
    }
    dispatch(stopLoader());
  };
};
