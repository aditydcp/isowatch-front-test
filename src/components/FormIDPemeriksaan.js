import React from "react";
import { useForm } from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";

const FormIDPemeriksaan = props => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    return (
        <form className="FormUnit FormIdPemeriksaan"
            onSubmit={handleSubmit(() => {
                try {
                    props.queryFunction()
                } catch (e) {
                    console.log(e)
                }
            })}>
            <label className="FormInputGroup">
                Masukkan ID Pemeriksaan
                <input
                    {...register("idPemeriksaan", {
                        required: "Tidak boleh kosong",
                        value: props.idPemeriksaan,
                        onChange: (e) => props.setIdPemeriksaan(e.target.value),
                })} aria-invalid={errors.idPemeriksaan ? "true" : "false"} />
            </label>
            <input type="submit" className="SubmitButton" />
            <div className="FormInputTooltip" role="alert">
                {errors.idPemeriksaan?.message}
                {props.validFlag === 2 ? "ID tidak ada atau terjadi masalah" : ""}
                {props.validFlag === 4 ? "ID sudah ada dalam list pemeriksaan Anda" : ""}
            </div>
            <div className="FormResponse">
                {props.validFlag === 1 ? <>
                    <IoCheckmark />
                </> : props.validFlag === 3 ? <>
                    <div className="spinner-miniform" />
                </> : <></>}
            </div>
        </form>
    )
}

export default FormIDPemeriksaan