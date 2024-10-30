import Logo from '../assets/images/logo.png'
import BigImage from '../assets/images/bigImageLogin.png';
import SmallImage from '../assets/images/smallImageLogin.png';
import Kernel  from '../assets/images/kernel.png';
export const LoginComplement = () => {
  return (
    <div className='xs:invisible xs:w-0 md:visible md:w-3/5 h-screen bglogin justify-center items-center flex '>
        <div className='logo w-9-/12 flex justify-center flex-col relative'>
            <img src={Logo}  width="300" className="self-center"/>
            <img src={Kernel}  width="300" className=""/>
            
        </div>
    </div>
  )
}
