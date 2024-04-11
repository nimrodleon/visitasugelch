import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import * as Yup from "yup"
import { useUserStore } from "../store"
import { passwordChangeById } from "../api"
import { Fragment, useRef } from "react"
import { Toast } from "primereact/toast"

export const PasswordChangeModal = (props) => {
    const { visible, setVisible } = props
    const currentUser = useUserStore(state => state.currentUser)
    const toast = useRef(null)

    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validationSchema: Yup.object({
            password: Yup.string().required('La contraseña es obligatoria')
        }),
        onSubmit: (values) => {
            passwordChangeById(currentUser.id, values.password).then(response => {
                toast.current.show({ severity: 'success', summary: 'Info', detail: 'La contraseña ha sido actualizada!' })
                setVisible(false)
            })
        }
    })

    return (
        <Fragment>
            <Dialog header="Cambiar Contraseña" modal={true}
                draggable={false} visible={visible}
                onHide={() => setVisible(false)} onShow={() => formik.resetForm()}>
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-3 align-items-center mt-1">
                    <label>Contraseña</label>
                    <InputText
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        style={{ minWidth: 350 }}
                        className={formik.errors.password
                            && formik.touched.password
                            && 'p-invalid'} />
                    <Button type="submit" severity="secondary" size="large" label="Cambiar Contraseña" />
                </form>
            </Dialog>
            <Toast ref={toast} />
        </Fragment>
    )
}