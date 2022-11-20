import React from "react";
import "./Dashboard.scss"

import logo from '../assets/logo.png'
import { isLoggedIn } from "../utils/cookie-monster";

function Dashboard() {
    const nama = "Aditya"

    return (
        <>
            {isLoggedIn() ? <>
            <div className="TopBar">
                <img src={logo} className="TopBarLogo" alt="Isowatch" />
                <div className="TopToolbar">
                    <div className="AdminAccount">
                        Selamat datang, {nama}
                    </div>
                    <div className="LogoutButton">
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
