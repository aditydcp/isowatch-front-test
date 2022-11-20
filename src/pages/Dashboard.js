import React, { useContext, useState } from "react";
import "./Dashboard.scss"
import { isLoggedIn, handleLogout, getName } from "../utils/cookie-monster";

import logo from '../assets/logo.png'

function Dashboard() {
    const [namaAdmin, setNamaAdmin] = useState(getName())

    return (
        <>
            {isLoggedIn() ? <>
            <div className="TopBar">
                <img src={logo} className="TopBarLogo" alt="Isowatch" />
                <div className="TopToolbar">
                    <div className="AdminAccount">
                        Selamat datang, {namaAdmin}
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
                <div className="PasienListPanel">

                </div>
                <div className="PasienDetailPanel">

                </div>
            </div>
            </> : window.location.href = "/login" }
        </>
    );
}

export default Dashboard;
