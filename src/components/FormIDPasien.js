import React from "react";
import { useForm } from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";

const FormIDPasien = props => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    return (
        <form className="FormUnit FormIdPasien"
            onSubmit={handleSubmit(() => {
                try {
                    props.queryFunction()
                } catch (e) {
                    console.log(e)
                }
            })}>
            <label className="FormInputGroup">
                {props.validFlag === 4 ? "Masukan " : ""}
                ID Pasien
                <input
                    {...register("idPasien", {
                        required: "Tidak boleh kosong",
                        value: props.idPasien,
                        onChange: (e) => props.setIdPasien(e.target.value),
                })} aria-invalid={errors.idPasien ? "true" : "false"} />
            </label>
            {!props.isDone ? <input type="submit" value="Check" className="SubmitButton" /> : <></>}
            <div className="FormInputTooltip" role="alert">
                {errors.idPasien?.message}
                {props.validFlag === 2 ? "ID tidak ada atau terjadi masalah" : ""}
            </div>
            <div className="FormResponse">
                {props.validFlag === 1 ? <>
                    <IoCheckmark /> Mendaftarkan pasien baru
                </> : props.validFlag === 3 ? <>
                    <div className="spinner-miniform" />
                </> : <></>}
                {props.validFlag === 4 ? "Pasien sudah terdaftar untuk pemeriksaan ini" : ""}
                {props.validFlag === 5 ? "Pasien sudah pernah terdaftar" : ""}
            </div>
        </form>
    )
}

export default FormIDPasien