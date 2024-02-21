import React from 'react'

export const Modal = ({ show, onSuccess, onClose, children, title, size="" }) => {
    return (
        <>
            {show ? <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen backdrop-blur	">
                <div className={`relative p-4 w-full ${size} overflow-auto`}>
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow h-3/4">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5 space-y-4">
                            {children}
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                            <button data-modal-hide="default-modal" type="button" className="text-white bg-sqgreen-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Aceptar</button>
                            <button data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
                : null}
        </>
    )
}
