import React from "react";
import { isLoggedIn, handleLogout, getName } from "../utils/cookie-monster";
import './AddPemeriksaan.scss'

import logo from '../assets/logo.png'

const AddPemeriksaan = () => {
    return (
        <>
            {isLoggedIn() ? <>
            <div className="TopBar">
                <img src={logo} className="TopBarLogo" alt="Isowatch" />
                <div className="TopToolbar">
                    <div className="AdminAccount">
                        Selamat datang, {getName()}
                    </div>
                    <div className="LogoutButton" onClick={() => {
                        handleLogout()
                        window.location.href = "/login"
                        }}>
                        Log Out
                    </div>
                </div>
            </div>
            <div className="MainPanel">
                <div className="PanelTitle">
                    Tambah Pasien
                </div>
                <div className="ProcedureContainer">

                </div>
                <div className="FormContainer">
                    
                </div>
            </div>
            </> : window.location.href = "/login" }
        </>
    )
}

export default AddPemeriksaan