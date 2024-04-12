import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { FormModalType, useFuncionarioStore } from "../store"
import { createFuncionario, getAllLugares, updateFuncionarioById } from "../api"
import * as Yup from "yup"
import { useState } from "react"
import { Dropdown } from "primereact/dropdown"

export const FuncionarioFormModal = (props) => {
    const { visible, setVisible } = props
    const {
        currentFuncionario,
        formType,
        agregarFuncionario,
        editarFuncionario
    } = useFuncionarioStore(state => ({
        currentFuncionario: state.currentFuncionario,
        formType: state.formType,
        agregarFuncionario: state.agregarFuncionario,
        editarFuncionario: state.editarFuncionario
    }))
    const [lugares, setLugares] = useState([])

    const formik = useFormik({
        initialValues: {
            dni: "",
            nombres_completos: "",
            lugar: {},
        },
        validationSchema: Yup.object({
            dni: Yup.string().required("El DNI es requerido"),
            nombres_completos: Yup.string().required("Los nombres son requeridos"),
            lugar: Yup.object().shape({
                id: Yup.number().required("El lugar es requerido")
            }).required("El lugar es requerido")
        }),
        onSubmit: (values) => {
            if (formType === FormModalType.ADD) {
                createFuncionario({
                    dni: values.dni,
                    nombres_completos: values.nombres_completos,
                    lugar_id: values.lugar.id
                }).then(response => {
                    agregarFuncionario(response)
                    setVisible(false)
                })
            }
            if (formType === FormModalType.EDIT) {
                updateFuncionarioById(currentFuncionario.id, {
                    dni: values.dni,
                    nombres_completos: values.nombres_completos,
                    lugar_id: values.lugar.id
                }).then(response => {
                    editarFuncionario(response)
                    setVisible(false)
                })
            }
        }
    })

    return (
        <Dialog header="Funcionarios Oficina" modal={true}
            draggable={false} visible={visible}
            onHide={() => setVisible(false)} onShow={async () => {
                const _lugares = await getAllLugares()
                setLugares(_lugares)
                if (formType === FormModalType.ADD) formik.resetForm()
                if (formType === FormModalType.EDIT) {
                    formik.setValues({
                        dni: currentFuncionario.dni || "",
                        nombres_completos: currentFuncionario.nombres_completos || "",
                        lugar: {
                            id: currentFuncionario.lugar_id,
                            nombre: currentFuncionario.nombre
                        }
                    })
                }
            }}>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3 mt-1">
                <label>D.N.I</label>
                <InputText
                    name="dni"
                    value={formik.values.dni}
                    onChange={formik.handleChange}
                    style={{ minWidth: 350 }}
                    className={formik.errors.dni
                        && formik.touched.dni
                        && 'p-invalid'} />
                <label>Oficina y/o Lugar</label>
                <Dropdown
                    name="lugar"
                    options={lugares}
                    optionLabel="nombre"
                    value={formik.values.lugar}
                    onChange={formik.handleChange}
                    style={{ minWidth: 350 }}
                    className={formik.errors.lugar
                        && formik.touched.lugar
                        && 'p-invalid'} />
                <label>Nombres</label>
                <InputText
                    name="nombres_completos"
                    value={formik.values.nombres_completos}
                    onChange={formik.handleChange}
                    style={{ minWidth: 350 }}
                    className={formik.errors.nombres_completos
                        && formik.touched.nombres_completos
                        && 'p-invalid'} />
                <Button type="submit" severity="secondary" label="Guardar" />
            </form>
        </Dialog>
    )
}