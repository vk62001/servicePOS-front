import { SDKZeus } from "../../SDK/SDKZeus"
import { setCentralTables, setFlagTiendas, setLogConnection, setTiendas, startLoader, stopLoader } from "./dataSlice";


export const getAllPOS = () => {
    return async (dispatch, getState) => {
        dispatch(startLoader())
        try {
                const {data} = await SDKZeus.getAllPOS();
                dispatch(setTiendas({tiendas:data.data.datas}))
                if(data.data.datas.length > 0) {
                    dispatch(setFlagTiendas({flagTiendas:true}))
                }
                await dispatch(stopLoader())
        }catch(err){
            console.log(err)
            await dispatch(stopLoader())
        }

    }
}

export const getCentralTables = (id) => {
    return async (dispatch, getState)=>{
        dispatch(startLoader())
        try {
            
            const {data} = await SDKZeus.getAllTables(id);
            await dispatch(setCentralTables({centralTables:data.data.data}));
            await dispatch(stopLoader());

        } catch (error) {
            console.log(error);
            await dispatch(stopLoader());
        }   

    };
} 

export const updatePOSL = (data) => {
    return async(dispatch, getState) => {
        await dispatch(setTiendas({tiendas:data}))
    }
}

  export const getCentralLogConnection = () => {
    return async (dispatch, getState) => {
      try {
        const { data } = await SDKZeus.getLogConnection();
        console.log(data);
        await dispatch(setLogConnection(data.data))
      } catch (err) {
        console.log(err);
      }
    };
  }