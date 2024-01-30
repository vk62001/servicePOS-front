import { useDispatch } from "react-redux"
import { setAuth } from "../store/data";
import { deleteCacheKey } from "../cache/cache";
// import { closeSession } from "../store/data";

export const MenuSingOut = () =>{
    const dispatch =  useDispatch();
    const singOut = () => {
         dispatch(setAuth({auth:false}));
         deleteCacheKey('@userSQK');
    };
    
    return(<div className="fixed top-12 right-8 bg-white  text-xs text-stonte-600 p-6 rounded-lg shadow max-h-52 ">
                <h4 className="mulishBold text-sqgreen-900 cursor-pointer" onClick={singOut}>Cerrar sesión</h4>
            </div>)
}