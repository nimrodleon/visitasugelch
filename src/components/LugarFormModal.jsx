import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { FormModalType, useLugarStore } from "../store"
import { createLugar, updateLugarById } from "../api"

export const LugarFormModal = (props) => {
    const { visible, setVisible } = props
    const {
        currentLugar,
        formType,
        agregarLugar,
        editarLugar,
    } = useLugarStore(state => ({
        currentLugar: state.currentLugar,
        formType: state.formType,
        agregarLugar: state.agregarLugar,
        editarLugar: state.editarLugar,
    }))

    const formik = useFormik({
        initialValues: {
            nombre: ""
        },
        onSubmit: (values) => {
            if (formType === FormModalType.ADD) {
                createLugar(values).then(response => {
                    agregarLugar(response)
                    setVisible(false)
                })
            }
            if (formType === FormModalType.EDIT) {
                updateLugarById(currentLugar.id, values).then(response => {
                    editarLugar(response)
                    setVisible(false)
                })
            }
        }
    })

    return (
        <Dialog header="Lugar y/o Oficina" modal={true}
            draggable={false} visible={visible}
            onHide={() => setVisible(false)} onShow={() => {
                if (formType === FormModalType.ADD) formik.resetForm()
                if (formType === FormModalType.EDIT) {
                    formik.setValues({
                        nombre: currentLugar.nombre
                    })
                }
            }}>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3 align-items-center mt-1">
                <label>Ingrese nombre de la Oficina</label>
                <InputText
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    style={{ minWidth: 350 }} />
                <Button type="submit" severity="secondary" label="Guardar" />
            </form>
        </Dialog>
    )
}