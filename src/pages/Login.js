import React, { useState } from "react";
import './Login.scss'
import { useForm } from "react-hook-form";

import logo from '../assets/logo.png'
import icon from '../assets/icon_main_full.png'

const Login = () => {   
    const { register, formState: { errors }, handleSubmit } = useForm()
    const onSubmit = data => console.log(data);

    const [idAdmin, setIdAdmin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <div className="TopBar Bar">
                <img src={logo} className="TopBarLogo" alt="Isowatch" />
            </div>
            <div className="Container">
                <div className="LogoContainer">
                    <img src={icon} className="Logo" />
                </div>
                <div className="LoginPanel">
                    <div className="Title">
                        Log In
                    </div>
                    <form className="FormContainer" onSubmit={handleSubmit(onSubmit)}>
                        <label className="FormInputGroup">
                            <input className="FormInput"
                                {...register("idAdmin", {
                                    required: "Tidak boleh kosong",
                                    value: idAdmin,
                                    onChange: (e) => setIdAdmin(e.target.value),
                            })} aria-invalid={errors.idAdmin ? "true" : "false"} />
                            <div className="FormInputTooltip" role="alert">
                                {errors.idAdmin?.message}
                            </div>
                        </label>
                        <label className="FormInputGroup">
                            <input 
                                {...register("password", {
                                    required: "Tidak boleh kosong",
                                    value: password,
                                    onChange: (e) => setPassword(e.target.value),
                            })} aria-invalid={errors.password ? "true" : "false"} />
                            <div className="FormInputTooltip" role="alert">
                                {errors.password?.message}
                            </div>
                        </label>
                        <input type="submit" className="FormSubmitButton" />
                    </form>
                </div>
            </div>
            <div className="Bar" />
        </>
    )
}

export default Login