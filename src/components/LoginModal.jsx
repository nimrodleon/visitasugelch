import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import * as Yup from "yup"
import { getAccessTokenWithLogin } from "../api"
import { Fragment, useRef } from "react"
import { Toast } from "primereact/toast"

const LoginSchema = Yup.object().shape({
    usuario: Yup.string().required('El usuario es requerido'),
    password: Yup.string().required('La contraseña es requerida')
})

export const LoginModal = (props) => {
    const { visible, setVisible } = props
    const toast = useRef(null)

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            getAccessTokenWithLogin(values)
                .then(response => {
                    const { token } = response
                    console.log(token)
                    localStorage.setItem('AuthToken', token)
                    window.location.reload()
                })
                .catch(() => {
                    toast.current.show({ severity: 'error', summary: 'Info', detail: 'Credenciales Invalidas!' })
                })
        }
    })

    return (
        <Fragment>
            <Dialog header="Iniciar Sessión" modal={true} draggable={false} visible={visible} onHide={() => setVisible(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-column gap-3 align-items-center mt-1">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText
                                name="usuario"
                                value={formik.values.usuario}
                                onChange={formik.handleChange}
                                placeholder="Usuario"
                                className={formik.errors.usuario
                                    && formik.touched.usuario
                                    && 'p-invalid'} />
                        </div>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <Password
                                feedback={false}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Contraseña"
                                className={formik.errors.password
                                    && formik.touched.password
                                    && 'p-invalid'} />
                        </div>
                        <Button type="submit" className="w-full" severity="secondary" size="large" label="Iniciar Sessión" />
                    </div>
                </form>
            </Dialog>
            <Toast ref={toast} />
        </Fragment>
    )
}