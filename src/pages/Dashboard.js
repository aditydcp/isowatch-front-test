import React, { useContext, useState } from "react";
import "./Dashboard.scss"
import { isLoggedIn, handleLogout, getName, getToken, getId } from "../utils/cookie-monster";
import { IoAddCircleOutline, IoWarningOutline, IoRefreshCircle, IoPeople, IoPulse } from 'react-icons/io5'
import logo from '../assets/logo.png'
import { NavLink } from "react-router-dom";
import PasienDetail from "../components/PasienDetail";
import axios from "axios";
import PasienItem from "../components/PasienItem";

function Dashboard() {
    const [namaAdmin, setNamaAdmin] = useState(getName())
    const [idAdmin, setIdAdmin] = useState(getId())
    const [token, setToken] = useState(getToken())
    const [pasienList, setPasienList] = useState([])
    const [activePasienId, setActivePasienId] = useState('')
    const [isServerOK, setIsServerOK] = useState(true)

    async function getPasienList() {
        let config = {
            method: "get",
            url: `https://isowatch.herokuapp.com/admin/${idAdmin}/active-pemeriksaan`,
            data: {},
            headers: {'Authorization': "Bearer " + token},
            //params: {id: `${idAdmin}`},
        }

        console.log("Attempting to make a request...")
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            setIsServerOK(true)
            setPasienList(result.data.result)
            console.log("Done. Success.")
        })
        .catch((error) => {
            console.log(error)
            setIsServerOK(false)
            setPasienList([])
            console.log("Done. Failed.")
        })
    }

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
                    <div className="PasienToolbar" onClick={() => {getPasienList()}} >
                        <IoRefreshCircle />
                    </div>
                    <div className="PasienList">
                        {console.log(pasienList)}
                        {pasienList.length === 0 ? <>
                            <div className="SuwungNotice">
                                <IoPeople />
                                Tidak ada pemantauan. <br />
                                Refresh atau tambah pasien.
                            </div>
                        </> : pasienList.map((pasien, key) => 
                            <PasienItem pasien={pasien} active={activePasienId === pasien.idPasien} setActive={setActivePasienId} />
                        )}
                    </div>
                    <NavLink to="/add" className="AddPasienButton">
                        <IoAddCircleOutline />
                        Tambah Pasien
                    </NavLink>
                </div>
                <div className="PasienDetailPanel">
                    {activePasienId === '' ? <>
                        <div className="SuwungNotice">
                            <IoPulse />
                            Pilih pasien untuk melihat detail pemantauan
                        </div>
                    </> : <PasienDetail id={activePasienId} />}
                </div>
            </div>
            </> : window.location.href = "/login" }
        </>
    );
}

export default Dashboard;
