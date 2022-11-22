import React, { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import './PemeriksaanDetail.scss'

import HeartIcon from '../assets/icon_heart.png'
import BloodPressureIcon from '../assets/icon_pressure.png'
import BloodOxygenIcon from '../assets/icon_oxygen.png'

const PemeriksaanDetail = props => {
    const [localT, setLocalT] = useState(0)
    const [localHealthPoints, setLocalHealthPoints] = useState([])
    const height = 125
    const width = 650

    // when new data comes in
    useEffect(() => {
        console.log("PemeriksaanDetail.js: New Healthpoint found!")
        // check if total data is less than 20
        if (localT < 20){
            // if so, append newHealthPoint to localHealthPoints
            setLocalHealthPoints(current => [...current, props.newHealthPoint])
            setLocalT(localT + 1)
        }
        else {
            // else, remove the first element and append the new one to the last
            let [first, ...rest] = localHealthPoints
            setLocalHealthPoints(...rest, props.newHealthPoint)
        }
    }, [props.newHealthPoint])

    useEffect(() => {
        // assign props to local state to manipulate later
        setLocalHealthPoints(props.healthPoints)
        setLocalT(props.healthPoints.length)
    }, [props.healthPoints])

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
                            <AreaChart width={width} height={height} data={localHealthPoints}>
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
                            <AreaChart width={width} height={height} data={localHealthPoints}>
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
                            <AreaChart width={width} height={height} data={localHealthPoints}>
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