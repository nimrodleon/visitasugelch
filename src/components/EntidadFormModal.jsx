import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import * as Yup from "yup"

const EntidadSchema = Yup.object().shape({
    ruc: Yup.string().required("El R.U.C es requerido"),
    rzn_social: Yup.string().required("La Razón Social es requerida")
})

export const EntidadFormModal = (props) => {
    const { visible, setVisible, saveChanges } = props

    const formik = useFormik({
        initialValues: {
            ruc: "",
            rzn_social: ""
        },
        validationSchema: EntidadSchema,
        onSubmit: (values) => {
            console.log(values)
            saveChanges(data)
            setVisible(false)
        }
    })

    return (
        <Dialog header="Entidad Visitante" modal={true}
            draggable={false} visible={visible}
            onHide={() => setVisible(false)} onShow={() => formik.resetForm()}>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3 mt-1">
                <label>R.U.C</label>
                <InputText
                    name="ruc"
                    value={formik.values.ruc}
                    onChange={formik.handleChange}
                    style={{ minWidth: 350 }}
                    className={formik.errors.ruc
                        && formik.touched.ruc
                        && 'p-invalid'} />
                <label>Razón Social</label>
                <InputText
                    name="rzn_social"
                    value={formik.values.rzn_social}
                    onChange={formik.handleChange}
                    style={{ minWidth: 350 }}
                    className={formik.errors.rzn_social
                        && formik.touched.rzn_social
                        && 'p-invalid'} />
                <Button type="submit" severity="secondary" label="Guardar" />
            </form>
        </Dialog>
    )
}