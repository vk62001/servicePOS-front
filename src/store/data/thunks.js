import { SDKZeus } from "../../SDK/SDKZeus"
import { setCentralTables, setTiendas, startLoader, stopLoader } from "./dataSlice";


export const getAllPOS = () => {
    return async (dispatch, getState) => {
        dispatch(startLoader())
        try {
                const {data} = await SDKZeus.getAllPOS();
                await dispatch(setTiendas({tiendas:data.data.datas}))
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

