import { SDKZeus } from "../../SDK/SDKZeus";
import {
  setCentralTables,
  setFlagTiendas,
  setLogConnection,
  setTiendas,
  startLoader,
  stopLoader,
  setCountDisconnect
} from "./dataSlice";



export const getAllPOS = () => {
  return async (dispatch, getState) => {
    dispatch(startLoader());
    try {
      const { data } = await SDKZeus.getAllPOS();
      const dataCount = await SDKZeus.getCountYesterday(0);
      const tempData = data.data.datas.map((e) => {
        const item = dataCount.data.data.find((e2) => e2.TIENDA === e.clave);
        let valid = false
        for (const key in item) {
          if (key !== 'TIENDA') {
            if (item[key] > 0) valid = true;
          }
        }
        return {
          ...e,
          countYesterday: item,
          warning : valid ? true: false
        };
      });

    //   dispatch(setTiendas({ tiendas: data.data.datas }));
      dispatch(setTiendas({ tiendas: tempData }));
      if (data.data.datas.length > 0) {
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
      await dispatch(setCentralTables({ centralTables: data.data.data }));
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
    await dispatch(setTiendas({ tiendas: data }));
  };
};

export const getCentralLogConnection = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await SDKZeus.getLogConnection();
      console.log(data.data.length, '75')
      await dispatch(setLogConnection(data.data));
      dispatch(setCountDisconnect({countDisconnected: data.data.length}));
    } catch (err) {
      console.log(err);
    }
  };
};
