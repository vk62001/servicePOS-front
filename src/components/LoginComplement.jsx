import Logo from '../assets/images/logo.png'
import BigImage from '../assets/images/bigImageLogin.png';
import SmallImage from '../assets/images/smallImageLogin.png';

export const LoginComplement = () => {
  return (
    <div className=' md:w-3/5 h-screen bglogin justify-center items-center flex'>
        <div className='logo w-9-/12 flex justify-center flex-col relative'>
            <img src={Logo}  width="300" className="mb-20 self-center"/>
            <img src={BigImage}  width="500" className=""/>
            <img src={SmallImage}  width="300" className="absolute -bottom-10 -right-10"/>
        </div>
    </div>
  )
}
