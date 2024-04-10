import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"

export const LugarFormModal = (props) => {
    const { visible, setVisible, saveChanges } = props

    const formik = useFormik({
        initialValues: {
            value: ""
        },
        onSubmit: (values) => {
            console.log(values)
            saveChanges(data)
            setVisible(false)
        }
    })

    return (
        <Dialog header="Lugar" modal={true}
            draggable={false} visible={visible}
            onHide={() => setVisible(false)} onShow={() => formik.resetForm()}>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3 align-items-center mt-1">
                <label>Nombre</label>
                <InputText
                    name="value"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    style={{ minWidth: 350 }} />
                <Button type="submit" severity="secondary" label="Registrar" />
            </form>
        </Dialog>
    )
}