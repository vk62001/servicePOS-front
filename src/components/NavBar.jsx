import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import { MenuSingOut } from './MenuSingOut';
import { Notifications } from './Notifications';


export const NavBar = () => {

  const {user, countDisconnected, logConnection, serverDisconnected} = useSelector(state=>state.dataSlice);
  const [showNotifications, setShowNotifications] = useState(false);
  const [menuClose, setMenuClose] = useState(false);

  let activeClassName = "border-b-4 border-gold-500 pb-6";
  let noActiveClassName =  'border-0'
  return (
    <div className={`mulishRegular w-full fixed ${!serverDisconnected ? 'bg-sqgreen-900':'bg-red-500' }  py-4 flex justify-between items-center rounded-br-3xl rounded-bl-3xl z-10`}>
      <div className='logoandmenu flex justify-center items-center mx-10'>
        <div className='log'>
          <img src={Logo} width="139px"/>
        </div>
        <div className='menu text-white'>
          <span className='p-4 hover:text-gold-500'>
            <NavLink to="/" 
            className={({ isActive })  => isActive ? activeClassName : noActiveClassName}

            >Mapa</NavLink>
          </span>
          <span className='p-4 hover:text-gold-500'>
            <NavLink to="/tiendas" 
            className={({ isActive })  => isActive ? activeClassName : noActiveClassName}

            >Tiendas</NavLink>
          </span>
        </div>
      </div>
      <div className='user flex pr-4'>
        <div onClick={()=>setShowNotifications(!showNotifications)} className='notifications mr-4 relative cursor-pointer'>
          <FontAwesomeIcon icon={faBell} className="text-white" />
          <span style={{fontSize:10}} className='dot flex bg-gold-500 absolute text-sqgreen-900 items-center justify-center rounded-full w-5 h-5 text-small -left-2 -top-3'>{countDisconnected}</span>
        </div>
        {/* <div className='name text-sm text-white'>Eder Domínguez</div> */}
        <div className='dropdonw px-4' onClick={()=>setMenuClose(!menuClose)}><FontAwesomeIcon icon={faChevronDown} className="text-white cursor-pointer" /></div>
      </div>
      {showNotifications ?
        <Notifications 
          className={''}
          items = {logConnection}
        />
      :null}
      {menuClose? < MenuSingOut />:null}
    </div>
  )
}
