import React, { useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import './PemeriksaanDetail.scss'

import HeartIcon from '../assets/icon_heart.png'
import BloodPressureIcon from '../assets/icon_pressure.png'
import BloodOxygenIcon from '../assets/icon_oxygen.png'

const PemeriksaanDetail = props => {
    const data = [{t: 1, hr: 70, sbp:120}, {t: 2, hr: 74, sbp:117}, {t: 3, hr: 78, sbp:114}, {t: 4,hr: 73, sbp:120}, {t: 5, hr: 80, sbp:121}]
    const [currentData, setCurrentData] = useState(data)
    const [currentT, setCurrentT] = useState(5)

    // async function getHealthPoints() {
        
    // }

    // function addHealthPoint() {
    //     if (currentT < 20) {

    //     }
    //     else {

    //     }
    // }

    // useEffect(() => {
    //     const pusher = new Pusher('518f3d0acbc08f465beb', {
    //         cluster: 'ap1',
    //         encrypted: true,
    //     })
    //     const channel = pusher.subscribe('healthpoints')

    //     channel.bind('inserted', addHealthPoint)
    // }, [])

    function getBirthDate() {
        let date_in_milliseconds = Date.parse(props.pasienData.tanggalLahir)
        let birthdate = new Date(date_in_milliseconds)
        return birthdate
    }

    function getBirthDateString() {
        return getBirthDate().toLocaleDateString()
    }

    function getAge() {
        console.log(new Date())
        let age = 0
        let now = new Date()
        let birthdate = getBirthDate()

        if((birthdate.getDate() >= now.getDate()) &&
            (birthdate.getMonth() >= now.getMonth())) {
            age--
        }

        return age + (now.getFullYear() - birthdate.getFullYear())
    }

    return (
        <>
            <div className="HealthPanel">
                {props.isOnServerProcess ? <>
                    <div class="spinner-healthpanel"></div>
                </> : <>
                    <div className="ParameterDisplay">
                        <div className="ParameterIcon">
                            <img src={HeartIcon} className="Icon" />
                            <div className="Title">
                                Heart Rate
                            </div>
                        </div>
                        <div className="ParameterDetail">
                            <AreaChart width={600} height={150} data={props.healthPoints}>
                                <defs>
                                    <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="heartRate" stroke="#8884d8" fillOpacity={1} fill="url(#colorHr)" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                <XAxis dataKey="timestamp" />
                                <YAxis type="number" domain={['auto', 'auto']} />
                                <Tooltip />
                            </AreaChart>
                        </div>
                    </div>
                    <div className="ParameterDisplay">
                        <div className="ParameterIcon">
                            <img src={BloodPressureIcon} className="Icon" />
                            <div className="Title">
                                Blood Pressure
                            </div>
                        </div>
                        <div className="ParameterDetail">
                            <AreaChart width={600} height={150} data={props.healthPoints}>
                                <defs>
                                    <linearGradient id="colorBps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorBpd" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="sistolicBloodPressure" stroke="#82ca9d" fillOpacity={1} fill="url(#colorBps)" />
                                <Area type="monotone" dataKey="diastolicBloodPressure" stroke="#8884d8" fillOpacity={1} fill="url(#colorBpd)" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                <XAxis dataKey="timestamp" />
                                <YAxis type="number" domain={['auto', 'auto']} />
                                <Tooltip />
                            </AreaChart>
                        </div>
                    </div>
                    <div className="ParameterDisplay">
                        <div className="ParameterIcon">
                            <img src={BloodOxygenIcon} className="Icon" />
                            <div className="Title">
                                Blood Oxygen
                            </div>
                        </div>
                        <div className="ParameterDetail">
                            <AreaChart width={600} height={150} data={props.healthPoints}>
                                <defs>
                                    <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="bloodOxygen" stroke="#8884d8" fillOpacity={1} fill="url(#colorHr)" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                <XAxis dataKey="timestamp" />
                                <YAxis type="number" domain={['auto', 'auto']} />
                                <Tooltip />
                            </AreaChart>
                        </div>
                    </div>
                </> }
            </div>
            <div className="ProfilePanel">
                <div className="PanelTitle">
                    Profil Pasien
                </div>
                <div className="PanelContent">
                    {props.isOnServerProcess ? <>
                        <div class="spinner"></div>
                    </> : <>
                        <div className="ContentItem">
                            ID Pasien: {props.pasienData.idPasien}
                        </div>
                        <div className="ContentItem">
                            Nama: {props.pasienData.namaPasien}
                        </div>
                        <div className="ContentItem">
                            Jenis Kelamin: {props.pasienData.gender}
                        </div>
                        <div className="ContentItem">
                            Tanggal Lahir: {getBirthDateString()}
                        </div>
                        <div className="ContentItem">
                            Usia: {getAge()}
                        </div>
                        <div className="ContentItem">
                            Alamat: {props.pasienData.alamat}
                        </div>
                        <div className="ContentItem">
                            Keluhan: {props.pasienData.keluhan ? props.pasienData.keluhan : "Tidak ada"}
                        </div>
                        <div className="ContentItem">
                            Riwayat Penyakit: {props.pasienData.riwayatPenyakit ? props.pasienData.riwayatPenyakit : "Tidak ada"}
                        </div>
                    </> }
                </div>
            </div>
        </>
    )
}

export default PemeriksaanDetail