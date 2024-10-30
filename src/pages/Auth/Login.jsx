import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Kernel  from '../../assets/images/kernel.png';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/Input";
import { faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/Button";
import { LoginComplement } from "../../components/LoginComplement";
import { asyncLogin, setAuthError } from "../../store/data";
import Logo from '../../assets/images/logo.png';
export const Login = () => {
  const dispatch = useDispatch();
  const { authError } = useSelector((state) => state.dataSlice);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onLogin = () => {
    dispatch(setAuthError(""));
    setLoginError("");
    const objUser = {
      username: email,
      password,
    };
    dispatch(asyncLogin(objUser));
  };

  useEffect(() => {
    if (authError.length > 0) {
      setLoginError("Favor de revisar el usuario o contraseña");
    }
    return () => {};
  }, [authError]);

  return (
    <div className="lg:h-screen lg:w-full  flex">
      <div className="mulishRegular relative xs:w-full md:w-2/5 h-screen  flex flex-column items-center justify-center">
        <div className="contenLogin xs:w-11/12 md:w-7/12">
          <h1 className="mulishBold xs:invisible text-center text-3xl verdeprincipal">
            Bienvenido
          </h1>
          <div className="w-full md:invible flex justify-center flex-col">
            <img src={Logo}  width="125" className="self-center"/>
            <img 
            className="md:invisible self-center"
            style={{filter: "drop-shadow(1px 1px 0px rgba(0, 0, 0, 0.7))"}}
              src={Kernel}  width="125"
              />
            </div>
          <p className="text-center text-xs tracking-wide md:mt-2 xs:mt-10">
            Ingresa tu usuario y contraseña
          </p>
          <div className="inputLogin mt-20 relative">
            <p className="mb-2 text-xs text-sqgreen-900 mulishBold">Correo</p>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gray-400 absolute top-9 left-3"
            />
            <Input
              placeholder="Ingresa tu correo"
              className=""
              value={email}
              onChange={setEmail}
              error={loginError.length !== 0}
              messageError={loginError}
            />
          </div>
          <div className="inputPassword mt-8 relative">
            <p className="mb-2 text-xs text-sqgreen-900 mulishBold">
              Contraseña
            </p>
            <FontAwesomeIcon
              icon={faLock}
              className="text-gray-400 absolute top-9 left-3"
            />
            <span className="" onClick={() => setShowPass(!showPass)}>
              <FontAwesomeIcon
                icon={showPass ? faEye : faEyeSlash}
                className="text-sqgreen-900 absolute top-9 right-3 cursor-pointer"
              />
            </span>
            <Input
              placeholder="Ingresa tu contraseña"
              className=""
              value={password}
              onChange={setPassword}
              type={showPass ? "text" : "password"}
              error={loginError.length !== 0}
              messageError={loginError}
            />
          </div>
          <Button
            title="Ingresar"
            className="mt-24"
            icon={faRightToBracket}
            classIcon={"text-white"}
            onClick={onLogin}
          />
          <p className="mt-28 text-center text-gray-600">¿No tienes cuenta?</p>

          <p className="absolute m-auto bottom-4 left-0 right-0 text-gray-400 text-sm text-center">
            V {import.meta.env.VITE_REACT_APP_VERSION}
          </p>
        </div>
      </div>
      <LoginComplement />
    </div>
  );
};
