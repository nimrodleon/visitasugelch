import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import * as Yup from "yup"
import { FormModalType, useVisitanteStore } from "../store"
import { createVisitante, updateVisitante } from "../api"
import { Fragment, useRef } from "react"
import { Toast } from "primereact/toast"

export const VisitanteModal = (props) => {
    const { visible, setVisible } = props
    const {
        currentVisitante,
        formType,
        agregarVisitante,
        editarVisitante,
    } = useVisitanteStore(state => ({
        currentVisitante: state.currentVisitante,
        formType: state.formType,
        agregarVisitante: state.agregarVisitante,
        editarVisitante: state.editarVisitante,
    }))
    const toast = useRef(null)

    const formik = useFormik({
        initialValues: {
            dni: '',
            nombres_completos: '',
        },
        validationSchema: Yup.object({
            dni: Yup.string().required('El DNI es obligatorio'),
            nombres_completos: Yup.string().required('El nombre es obligatorio'),
        }),
        onSubmit: (values) => {
            if (formType === FormModalType.ADD) {
                createVisitante(values).then(response => {
                    agregarVisitante(response)
                    setVisible(false)
                }).catch(error => {
                    toast.current.show({ severity: 'error', summary: 'Info', detail: error.response.data.error })
                })
            }
            if (formType === FormModalType.EDIT) {
                updateVisitante(currentVisitante.id, values).then(response => {
                    editarVisitante(response)
                    setVisible(false)
                }).catch(error => {
                    toast.current.show({ severity: 'error', summary: 'Info', detail: error.response.data.error })
                })
            }
        }
    })

    return (
        <Fragment>
            <Dialog header={`${formType === FormModalType.ADD ? 'Registrar' : 'Editar'} Visitante`}
                modal={true} draggable={false}
                visible={visible}
                onShow={() => {
                    if (formType === FormModalType.ADD) formik.resetForm()
                    if (formType === FormModalType.EDIT) {
                        formik.setValues({
                            dni: currentVisitante.dni,
                            nombres_completos: currentVisitante.nombres_completos
                        })
                    }
                }} onHide={() => setVisible(false)}>
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
                    <label>Nombres Completos</label>
                    <InputText
                        name="nombres_completos"
                        value={formik.values.nombres_completos}
                        onChange={formik.handleChange}
                        style={{ minWidth: 350 }}
                        className={formik.errors.nombres_completos
                            && formik.touched.nombres_completos
                            && 'p-invalid'} />
                    <div className="flex justify-content-center gap-3">
                        <Button type="button" onClick={() => setVisible(false)} severity="secondary" size="large" label="Cancelar" />
                        <Button type="submit" severity="success" size="large" label="Guardar" />
                    </div>
                </form>
            </Dialog>
            <Toast ref={toast} />
        </Fragment>
    )
}