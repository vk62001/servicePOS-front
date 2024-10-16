import React from 'react'

export const RadioSearchPos = ({value, selectRadio}) => {


    const handleOptionChange = (e) => {
        selectRadio(e.target.value);
      };

  return (
    <>

<ul className="items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ">
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
        <div className="flex items-center px-3">
            <input 
                id="horizontal-list-radio-license" 
                type="radio" value="todos" 
                name="list-radio" 
                className="w-4 h-4 text-sqgreen-900 bg-gray-100 border-gray-300 focus:ring-sqgreen-900 accent-sqgreen-900  " 
                checked={value === "todos"}
                onChange={handleOptionChange}
            />
            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 px-2 ms-2 text-sm font-medium text-gray-900 ">Todos </label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
        <div className="flex items-center px-3">
            <input
                id="horizontal-list-radio-license" 
                type="radio" value="conectados" 
                name="list-radio" 
                className="w-4 h-4 text-sqgreen-900 bg-gray-100 border-gray-300 focus:ring-sqgreen-900 accent-sqgreen-900 " 
                checked={value === "conectados"}
                onChange={handleOptionChange}
            />
            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 px-2 ms-2 text-sm font-medium text-gray-900 ">Conectados</label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
        <div className="flex items-center px-3">
            <input 
                id="horizontal-list-radio-license" 
                type="radio" 
                value="desconectados" 
                name="list-radio" 
                className="w-4 h-4 text-sqgreen-900 bg-gray-100 border-gray-300 focus:ring-sqgreen-900 accent-sqgreen-900  " 
                checked={value === "desconectados"}
                onChange={handleOptionChange}
            />
            <label htmlFor="horizontal-list-radio-military" className="w-full py-3 px-2 ms-2 text-sm font-medium text-gray-900 ">Desconectados</label>
        </div>
    </li>
</ul>

    </>
  )
}
