import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import './PasienItem.scss'

const PasienItem = props => {
    return (
        <>
            <div className={`Pasien ${props.active ? `active` : ``}`}
            onClick={() => {props.setActive(props.pasien.idPasien)}}>
                <div className="Identifier">
                    <div className="Name">
                        Pasien ID {props.pasien.idPasien}
                    </div>
                    <div className="Condition">
                        Condition: Normal
                    </div>
                </div>
                <div className="IconSlot">
                    <IoWarningOutline />
                </div>
            </div>
        </>
    )
}

export default PasienItem