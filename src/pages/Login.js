import React, { useState } from "react";
import './Login.scss'
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "universal-cookie";
import { isLoggedIn } from "../utils/cookie-monster";

import logo from '../assets/logo.png'
import icon from '../assets/icon_main_full.png'

const cookies = new Cookies();

const Login = () => {   
    const { register, formState: { errors }, handleSubmit } = useForm()

    const [idAdmin, setIdAdmin] = useState('')
    const [password, setPassword] = useState('')
    // success state will use 4 flag:
    // 0 => neutral/unvisited
    // 1 => success/valid
    // 2 => false/invalid
    // 3 => validating
    const [isSuccessful, setSuccess] = useState(0)

    const config = {
        method: "post",
        url: "https://isowatch-web.up.railway.app/admin/login",
        data: {
            idAdmin,
            password,
        },
    }

    function requestEntry() {
        console.log("Attempting to request entry...")
        setSuccess(3)
        axios(config)
        .then((result) => {
            console.log(result)
            setSuccess(1)
            let expirationTime = 1000 * 60 * 60
            let expiresIn = new Date(new Date().getTime() + expirationTime)
            cookies.set("Isowatch-TOKEN", result.data.token, {
                path: "/",
                expires: expiresIn,
            })
            cookies.set("Isowatch-userID", result.data.idAdmin, {
                path: "/",
                expires: expiresIn,
            })
            cookies.set("Isowatch-name", result.data.namaAdmin, {
                path: "/",
                expires: expiresIn,
            })
            window.location.href = "/"
        })
        .catch((error) => {
            console.log(error)
            setSuccess(2)
        })
    }

    return (
        <>
            {isLoggedIn() ? window.location.href = "/" : <>
                <div className="TopBar Bar">
                    <img src={logo} className="TopBarLogo" alt="Isowatch" />
                </div>
                <div className="Container">
                    <div className="LogoContainer">
                        <img src={icon} className="Logo" alt="Monitoring System" />
                    </div>
                    <div className="LoginPanel">
                        <div className="Title">
                            Log In
                        </div>
                        <div className="FeedbackMessage">
                            {isSuccessful === 3 ? <>
                                <div className="processing">
                                    Mohon ditunggu... <br />
                                    Permintaan Anda sedang diproses
                                </div>
                            </> : <></>}
                            {isSuccessful === 2 ? <>
                                <div className="error">
                                    Terjadi suatu masalah
                                </div>
                            </> : <></>}
                        </div>
                        <form className="FormContainer"
                        onSubmit={handleSubmit(() => {
                            try {
                                requestEntry()
                            } catch (e) {
                                console.log(e)
                                setSuccess(2)
                            }
                        })}>
                            <label className="FormInputGroup">
                                <input placeholder="ID Admin"
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
                                <input type="password" placeholder="Password"
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
            </> }
        </>
    )
}

export default Login