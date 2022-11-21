import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import './PemeriksaanItem.scss'

const PemeriksaanItem = props => {
    return (
        <>
            <div className={`Pasien ${props.active ? `active` : ``}`}
            onClick={() => {
                props.setActive(props.pemeriksaan.idPemeriksaan)
                props.setPasien(props.pemeriksaan.idPasien)
                props.setLoad(true)
            }}>
                <div className="Identifier">
                    <div className="IDPemeriksaan">
                        ID Pemeriksaan: {props.pemeriksaan.idPemeriksaan}
                    </div>
                    <div className="IDPasien">
                        ID Pasien: {props.pemeriksaan.idPasien}
                    </div>
                    <div className="Condition">
                        Condition: Normal
                    </div>
                </div>
                {/* TODO: define condition */}
                {/* <div className="IconSlot">
                    <IoWarningOutline />
                </div> */}
            </div>
        </>
    )
}

export default PemeriksaanItem