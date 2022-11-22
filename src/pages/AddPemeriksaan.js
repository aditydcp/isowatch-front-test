import React, { useState } from "react";
import { isLoggedIn, handleLogout, getName, getToken, getId } from "../utils/cookie-monster";
import './AddPemeriksaan.scss'
import FormIDPemeriksaan from "../components/FormIDPemeriksaan";
import FormIDPasien from "../components/FormIDPasien";
import FormDataPasien from "../components/FormDataPasien";
import { IoArrowBackCircle } from "react-icons/io5"
import axios from "axios";
import { NavLink } from "react-router-dom";

import logo from '../assets/logo.png'

const AddPemeriksaan = () => {
    // formStage indicates the stages of the form the user is in
    // 0 => just got here
    // 1 => finished stage 1
    // 2 => finished stage 2
    // 3 => finished stage 3
    const [formStage, setFormStage] = useState(0)
    const [isDone, setIsDone] = useState(false)
    const [idPemeriksaan, setIdPemeriksaan] = useState('')
    const [idPasien, setIdPasien] = useState('')
    const [namaPasien, setNamaPasien] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState('')
    const [alamat, setAlamat] = useState('')
    const [gender, setGender] = useState('')
    const [keluhan, setKeluhan] = useState('')
    const [riwayatPenyakit, setRiwayatPenyakit] = useState('')
    
    // valid flags: 0 => unvalidated, 1 => valid, 2 => invalid, 3 => validating
    // flag 1 special case: 4 => pemeriksaan sudah ada di list, 5 => pemeriksaan sudah ada pasien
    const [validFlag1, setValidFlag1] = useState(0)
    // flag 2 special case: 4 => pasien sudah ada dalam pemeriksaan, 5 => entity pasien sudah terdaftar
    const [validFlag2, setValidFlag2] = useState(0)
    // flag 3 special case: 4 => entity pasien sudah terdaftar
    const [validFlag3, setValidFlag3] = useState(0)

    // standard valid flag: 0 => unchecked, 1 => success, 2 => failed, 3 => on process
    const [finishFlag, setFinishFlag] = useState(0)

    function getBirthDate(tanggal) {
        let date_in_milliseconds = Date.parse(tanggal)
        let birthdate = new Date(date_in_milliseconds)
        return birthdate
    }

    function getBirthDateString(tanggal) {
        return getBirthDate(tanggal).toLocaleDateString()
    }

    async function putAdmin() {
        let idAdmin = getId()
        let config = {
            method: "put",
            url: `https://isowatch.herokuapp.com/admin/pemeriksaan/${idPemeriksaan}`,
            data: { idAdmin },
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to put Admin...")
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            setFinishFlag(1)
        })
        .catch((error) => {
            console.log(error)
            setFinishFlag(2)
            console.log("Done. Failed.")
        })
    }

    async function putAdminAndPasien() {
        let idAdmin = getId()
        let config = {
            method: "put",
            url: `https://isowatch.herokuapp.com/pemeriksaan/${idPemeriksaan}`,
            data: { idAdmin, idPasien },
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to put Admin and Pasien...")
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            setFinishFlag(1)
        })
        .catch((error) => {
            console.log(error)
            setFinishFlag(2)
            console.log("Done. Failed.")
        })
    }

    async function registerPasienAndPut() {
        let config = {
            method: "post",
            url: `https://isowatch.herokuapp.com/patient/register`,
            data: {
                idPasien,
                namaPasien,
                tanggalLahir,
                alamat,
                gender,
                keluhan,
                riwayatPenyakit,
            },
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to put Admin and Pasien...")
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            putAdminAndPasien()
        })
        .catch((error) => {
            console.log(error)
            setFinishFlag(2)
            console.log("Done. Failed.")
        })
    }

    function finalize() {
        console.log("finalizing")
        setFinishFlag(3)
        if (validFlag1 === 5) {
            // update Admin on existing Pemeriksaan
            putAdmin()
        }
        else if (validFlag2 === 5) {
            // update Admin AND Pasien on Pemeriksaan
            putAdminAndPasien()
        }
        else {
            // create Pasien, then update Admin AND Pasien on Pemeriksaan
            registerPasienAndPut()
            // putAdminAndPasien()
        }
    }

    async function checkPemeriksaan() {
        let config = {
            method: "get",
            url: `https://isowatch.herokuapp.com/patient/pemeriksaan/${idPemeriksaan}`,
            data: {},
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to find Pemeriksaan...")
        setValidFlag1(3)
        setIsDone(false)
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            if ((!result.data.result.idPasien) &&
                (!result.data.result.idAdmin.includes(getId()))) {
                setValidFlag1(1)
                setFormStage(1)
                console.log("Done. Success.")
            }
            else {
                if ((result.data.result.idPasien) &&
                (!result.data.result.idAdmin.includes(getId()))) {
                    setValidFlag1(5)
                    setIdPasien(result.data.result.idPasien)
                    setFormStage(1)
                    setValidFlag2(4)
                    setIsDone(true)
                }
                else {
                    setValidFlag1(4)
                    setFormStage(0)
                }
            }
        })
        .catch((error) => {
            console.log(error)
            setValidFlag1(2)
            console.log("Done. Failed.")
        })
    }

    async function checkPasien() {
        let config = {
            method: "get",
            url: `https://isowatch.herokuapp.com/patient/${idPasien}`,
            data: {},
            headers: {'Authorization': "Bearer " + getToken()},
        }

        console.log("Attempting to find Pasien...")
        setFormStage(1)
        setValidFlag2(3)
        console.log(config)
        axios(config)
        .then((result) => {
            console.log(result)
            setValidFlag2(5)
            setValidFlag3(4)
            let dataPasien = result.data.result
            setNamaPasien(dataPasien.namaPasien)
            setGender(dataPasien.gender)
            setAlamat(dataPasien.alamat)
            setTanggalLahir(getBirthDateString(dataPasien.tanggalLahir))
            if(dataPasien.keluhan) setKeluhan(dataPasien.keluhan)
            if(dataPasien.riwayatPenyakit) setRiwayatPenyakit(dataPasien.riwayatPenyakit)
            setFormStage(2)
            setIsDone(true)
            console.log("Done. Success.")
        })
        .catch((error) => {
            console.log(error.response.status)
            if(error.response.status === 404) {
                setValidFlag2(1)
                setFormStage(2)
            }
            else {
                setValidFlag2(2)
                console.log("Done. Failed.")
            }
        })
    }

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
            <div className="MainPanelAdd">
                <div className="PanelTitle">
                    Tambah Pasien
                </div>
                <div className="Navigation">
                    <NavLink to="/">
                        <IoArrowBackCircle /> <span>Back</span>
                    </NavLink>
                </div>
                <div className="ProcedureContainer">
                    <div className="StageItem">
                        <div className="StageIcon">

                        </div>
                        <div className="StageTitle">

                        </div>
                    </div>
                    <div className="StageItem">
                        <div className="StageIcon">

                        </div>
                        <div className="StageTitle">
                            
                        </div>
                    </div>
                    <div className="StageItem">
                        <div className="StageIcon">

                        </div>
                        <div className="StageTitle">
                            
                        </div>
                    </div>
                </div>
                <div className="FormContainer">
                    <FormIDPemeriksaan
                        idPemeriksaan={idPemeriksaan}
                        setIdPemeriksaan={setIdPemeriksaan}
                        queryFunction={checkPemeriksaan}
                        validFlag={validFlag1}
                    />
                    {formStage > 0 ? 
                        <FormIDPasien
                            idPasien={idPasien}
                            setIdPasien={setIdPasien}
                            queryFunction={checkPasien}
                            validFlag={validFlag2}
                            isDone={isDone} />
                    : <></>}
                    {formStage > 1 ?
                        <FormDataPasien
                            namaPasien={namaPasien} setNamaPasien={setNamaPasien}
                            gender={gender} setGender={setGender}
                            tanggalLahir={tanggalLahir} setTanggalLahir={setTanggalLahir}
                            alamat={alamat} setAlamat={setAlamat}
                            keluhan={keluhan} setKeluhan={setKeluhan}
                            riwayatPenyakit={riwayatPenyakit} setRiwayatPenyakit={setRiwayatPenyakit}
                            stage={formStage} setStage={setFormStage}
                            validFlag={validFlag3}
                            queryFunction={finalize}
                            isDone={isDone} />
                    : <></>}
                </div>
                {isDone ? <div className="FinalButton"
                    onClick={() => {
                        finalize()
                    }}>
                    Finish
                </div> : <></>}
                {finishFlag === 3 ? <>
                    <div className="spinner-miniform" />
                </> : <></>}
                {finishFlag === 1 ? <>
                    <div className="GetBack success">
                        Proses Berhasil
                    </div>
                    <div className="GetBack">
                        <NavLink to="/">
                            Go Back
                        </NavLink>
                    </div>
                </> : <></>}
                {finishFlag === 2 ? <>
                    <div className="GetBack failed">
                        Proses Gagal
                    </div>
                    <div className="GetBack">
                        <NavLink to="/">
                            Go Back
                        </NavLink>
                    </div>
                </> : <></>}
            </div>
            </> : window.location.href = "/login" }
        </>
    )
}

export default AddPemeriksaan