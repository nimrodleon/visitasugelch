import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"

export const InputDialog = (props) => {
    const { visible, setVisible, data, saveChanges } = props

    const formik = useFormik({
        initialValues: {
            value: ""
        },
        onSubmit: (values) => {
            data.value = values.value
            console.log(values)
            saveChanges(data)
            setVisible(false)
        }
    })

    return (
        <Dialog header={data.title} modal={true} 
        draggable={false} visible={visible}
         onHide={() => setVisible(false)} onShow={() => formik.resetForm()}>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3 align-items-center mt-1">
                <label>{data.label}</label>
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