import React, { useEffect, useState } from "react";
import "./Dashboard.scss"
import { isLoggedIn, handleLogout, getName, getToken, getId } from "../utils/cookie-monster";
import { IoAddCircleOutline, IoRefreshCircle, IoPeople, IoPulse } from 'react-icons/io5'
import logo from '../assets/logo.png'
import { NavLink } from "react-router-dom";
import PemeriksaanDetail from "../components/PemeriksaanDetail";
import axios from "axios";
import PemeriksaanItem from "../components/PemeriksaanItem";

function Dashboard() {
    const [pemeriksaanList, setPemeriksaanList] = useState([])
    const [activePasienId, setActivePasienId] = useState('')
    const [activePasienData, setActivePasienData] = useState([])
    const [activePemeriksaanId, setActivePemeriksaanId] = useState('')
    const [isOnServerProcess, setIsOnServerProcess] = useState(false)

    async function getPemeriksaanList() {
        let config = {
            method: "get",
            url: `https://isowatch.herokuapp.com/admin/${getId()}/active-pemeriksaan`,
            data: {},
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to make a request...")
        setIsOnServerProcess(true)
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            setIsOnServerProcess(false)
            setPemeriksaanList(result.data.result)
            console.log("Done. Success.")
        })
        .catch((error) => {
            console.log(error)
            setIsOnServerProcess(false)
            setPemeriksaanList([])
            console.log("Done. Failed.")
        })
    }

    async function getPasienData() {
        let config = {
            method: "get",
            url: `https://isowatch.herokuapp.com/patient/${activePasienId}`,
            data: {},
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to make Pasien Data request...")
        setIsOnServerProcess(true)
        axios(config)
        .then((result) => {
            console.log(result)
            setActivePasienData(result.data.result)
            setIsOnServerProcess(false)
            console.log("Done. Success.")
        })
        .catch((error) => {
            console.log(error)
            setActivePasienData([])
            setIsOnServerProcess(false)
            console.log("Done. Failed.")
        })
    }

    useEffect(() => {
        getPemeriksaanList()
    }, [])

    useEffect(() => {
        getPasienData()
    }, [activePasienId])

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
                <div className="PasienListPanel">
                    <div className="PasienToolbar"
                    onClick={() => {
                        setPemeriksaanList([])
                        getPemeriksaanList()
                    }} >
                        <IoRefreshCircle />
                    </div>
                    <div className="PasienList">
                        {console.log(pemeriksaanList)}
                        {pemeriksaanList.length === 0 ? <>
                            <div className="SuwungNotice">
                                {isOnServerProcess ? <>
                                    <div className="spinner"></div>
                                    Sedang memproses... <br />
                                    Mohon ditunggu
                                </> : <>
                                    <IoPeople />
                                    Tidak ada pemantauan. <br />
                                    Refresh atau tambah pasien.
                                </>}
                            </div>
                        </> : pemeriksaanList.map((pemeriksaan, key) => 
                            <PemeriksaanItem
                                pemeriksaan={pemeriksaan}
                                pasien={activePasienData}
                                active={activePemeriksaanId === pemeriksaan.idPemeriksaan}
                                setActive={setActivePemeriksaanId}
                                setPasien={setActivePasienId}
                                setLoad={setIsOnServerProcess} />
                        )}
                    </div>
                    <NavLink to="/add" className="AddPasienButton">
                        <IoAddCircleOutline />
                        Tambah Pasien
                    </NavLink>
                </div>
                <div className="PasienDetailPanel">
                    {activePemeriksaanId === '' ? <>
                        <div className="SuwungNotice">
                            {isOnServerProcess ? <>
                                <div class="spinner"></div>
                                Sedang memproses... <br />
                                Mohon ditunggu
                            </> : <>
                                <IoPulse />
                                Pilih pasien untuk melihat detail pemantauan
                            </>}
                        </div>
                    </> : <PemeriksaanDetail
                        isOnServerProcess={isOnServerProcess}
                        idPemeriksaan={activePemeriksaanId}
                        pasienData={activePasienData} />}
                </div>
            </div>
            </> : window.location.href = "/login" }
        </>
    );
}

export default Dashboard;
