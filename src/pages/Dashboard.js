import React, { useEffect, useState } from "react";
import "./Dashboard.scss"
import { isLoggedIn, handleLogout, getName, getToken, getId } from "../utils/cookie-monster";
import { IoAddCircleOutline, IoRefreshCircle, IoPeople, IoPulse } from 'react-icons/io5'
import { NavLink } from "react-router-dom";
import PemeriksaanDetail from "../components/PemeriksaanDetail";
import axios from "axios";
import PemeriksaanItem from "../components/PemeriksaanItem";
import Pusher from 'pusher-js'

import logo from '../assets/logo.png'

function Dashboard() {
    const [pemeriksaanList, setPemeriksaanList] = useState([])
    const [activePasienId, setActivePasienId] = useState('')
    const [activePasienData, setActivePasienData] = useState([])
    const [activePemeriksaanId, setActivePemeriksaanId] = useState('')
    const [activePemeriksaanHP, setActivePemeriksaanHP] = useState([])
    const [newHealthPoint, setNewHealthPoint] = useState([])

    const [renderTrigger, setRenderTrigger] = useState(false)
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

    async function getHealthPointsOnActive() {
        let config = {
            method: "get",
            url: `https://isowatch.herokuapp.com/patient/pemeriksaan/${activePemeriksaanId}/healthpoint`,
            data: {},
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to make a request on HealthPoints...")
        setIsOnServerProcess(true)
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            setIsOnServerProcess(false)
            setActivePemeriksaanHP(result.data.result)
            console.log("Done. Success.")
        })
        .catch((error) => {
            console.log(error)
            setIsOnServerProcess(false)
            setActivePemeriksaanHP([])
            console.log("Done. Failed.")
        })
    }

    // TODO: evaluate condition
    async function healthEvaluator(healthPoint) {

    }

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: 'ap1',
            encrypted: true,
        })
        const channel = pusher.subscribe('healthpoints')

        channel.bind('inserted', (data) => {
            console.log("Here comes the Pusher")
            console.log(data)
            // check if the ID is the same as the current active ID
            // then add the newly added HP to the graph by passing newHealthPoint down
            if (data.idPemeriksaan === activePemeriksaanId)
                setRenderTrigger(!renderTrigger)
                setNewHealthPoint(data)
            
            // check if the ID is present in the Admin's list of Pemeriksaan
            let isUsers = false
            pemeriksaanList.map((pemeriksaan, key) => {
                if (pemeriksaan.idPemeriksaan === data.idPemeriksaan)
                    isUsers = true
            })

            // if ID is present, evaluate health
            // if (isUsers) healthEvaluator(data)

            // if not, do nothing
        })

        return () => {
            pusher.unsubscribe('healthpoints')
        }
    }, [])

    useEffect(() => {
        getPemeriksaanList()
    }, [])

    useEffect(() => {
        getPasienData()
        getHealthPointsOnActive()
    }, [activePasienId])

    return (
        <>
            {isLoggedIn() ? <>
            <div className="TopBar">
                <img src={logo} className="TopBarLogo" alt="Isowatch" />
                <div className="TopToolbar">
                    <div className={`ball ${renderTrigger ? "blue" : "red"}`} />
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
                        newHealthPoint={newHealthPoint}
                        healthPoints={activePemeriksaanHP}
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
