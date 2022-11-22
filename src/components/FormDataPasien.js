import React from "react";
import { useForm } from "react-hook-form";

const FormDataPasien = props => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    return (
        <form className="FormUnit FormDataPasien"
            onSubmit={handleSubmit(() => {
                try {
                    props.queryFunction()
                } catch (e) {
                    console.log(e)
                }
            })}>
            <label className="FormInputGroup">
                Nama Pasien
                <input
                    {...register("namaPasien", {
                        required: "Tidak boleh kosong",
                        value: props.namaPasien,
                        onChange: (e) => props.setNamaPasien(e.target.value),
                })} aria-invalid={errors.namaPasien ? "true" : "false"} />
                <div className="FormInputTooltip" role="alert">
                    {errors.namaPasien?.message}
                </div>
            </label>
            <label className="FormInputGroup GenderInput">
                Jenis Kelamin
                {props.validFlag === 4 ?
                    <div className="radio-button"> {props.gender} </div>
                : <>
                    <div className="radio-button">
                        <input type="radio" value="Laki-laki"
                            {...register("gender")} />
                            Laki-Laki
                    </div>
                    <div className="radio-button">
                        <input type="radio" value="Perempuan"
                            {...register("gender")} />
                            Perempuan
                    </div>
                </>}
                
            </label>
            <label className="FormInputGroup">
                <div className="FormTitleWithHint">
                    Tanggal Lahir
                    <span className="hint">Format: DD/MM/YYYY</span>
                </div>
                <input
                    {...register("tanggalLahir", {
                        required: "Tidak boleh kosong",
                        value: props.tanggalLahir,
                        onChange: (e) => props.setTanggalLahir(e.target.value),
                })} aria-invalid={errors.tanggalLahir ? "true" : "false"} />
                <div className="FormInputTooltip" role="alert">
                    {errors.tanggalLahir?.message}
                </div>
            </label>
            <label className="FormInputGroup">
                Alamat
                <textarea
                    {...register("alamat", {
                        required: "Tidak boleh kosong",
                        value: props.alamat,
                        onChange: (e) => props.setAlamat(e.target.value),
                })} aria-invalid={errors.alamat ? "true" : "false"} />
                <div className="FormInputTooltip" role="alert">
                    {errors.alamat?.message}
                </div>
            </label>
            <label className="FormInputGroup">
                <div className="FormTitleWithHint">
                    Keluhan
                    <span className="hint">Optional</span>
                </div>
                <textarea
                    {...register("keluhan", {
                        required: false,
                        value: props.keluhan,
                        onChange: (e) => props.setKeluhan(e.target.value),
                })} aria-invalid={errors.keluhan ? "true" : "false"} />
                <div className="FormInputTooltip" role="alert">
                    {errors.keluhan?.message}
                </div>
            </label>
            <label className="FormInputGroup">
                <div className="FormTitleWithHint">
                    Riwayat Penyakit
                    <span className="hint">Optional</span>
                </div>
                <textarea
                    {...register("riwayatPenyakit", {
                        required: false,
                        value: props.riwayatPenyakit,
                        onChange: (e) => props.setRiwayatPenyakit(e.target.value),
                })} aria-invalid={errors.riwayatPenyakit ? "true" : "false"} />
                <div className="FormInputTooltip" role="alert">
                    {errors.riwayatPenyakit?.message}
                </div>
            </label>
            {!props.isDone ? <input type="submit" className="SubmitButton" /> : <></>}
        </form>
    )
}

export default FormDataPasien