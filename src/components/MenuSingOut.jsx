import { useDispatch } from "react-redux"
// import { closeSession } from "../store/data";

export const MenuSingOut = () =>{
    const dispatch =  useDispatch();
    const singOut = () => {
        
        // dispatch(closeSession());
    }
    

    return(<div className="fixed top-12 right-8 bg-white  text-xs text-stonte-600 p-6 rounded-lg shadow max-h-52 ">
                <h4 className="mulishBold text-sqgreen-900 cursor-pointer" onClick={singOut}>Cerrar sesión</h4>
            </div>)
}