import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import * as Yup from "yup"
import { FormModalType, useUserStore } from "../store"
import { createUser, updateUserById } from "../api"
import { Fragment, useRef } from "react"
import { Toast } from "primereact/toast"

const UserSchema = Yup.object().shape({
    dni: Yup.string().required('D.N.I es requerido'),
    nombres: Yup.string().required('Nombres es requerido'),
    rol: Yup.string().required('Rol es requerido'),
    usuario: Yup.string().required('Usuario es requerido'),
})

export const UsuarioModal = (props) => {
    const { visible, setVisible } = props
    const {
        formType,
        currentUser,
        addUser,
        editUser,
    } = useUserStore(state => ({
        formType: state.formType,
        currentUser: state.currentUser,
        addUser: state.addUser,
        editUser: state.editUser,
    }))
    const toast = useRef(null)

    const formik = useFormik({
        initialValues: {
            dni: '',
            nombres: '',
            rol: '',
            usuario: '',
        },
        validationSchema: UserSchema,
        onSubmit: values => {
            if (formType === FormModalType.ADD) {
                createUser(values).then(response => {
                    addUser(response)
                    setVisible(false)
                }).catch(error => {
                    toast.current.show({ severity: 'error', summary: 'Info', detail: error.response.data.error })
                })
            }
            if (formType === FormModalType.EDIT) {
                updateUserById(currentUser.id, values)
                    .then(response => {
                        editUser(response)
                        setVisible(false)
                    }).catch(error => {
                        toast.current.show({ severity: 'error', summary: 'Info', detail: error.response.data.error })
                    })
            }
        }
    })

    const roles = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
    ]

    return (
        <Fragment>
            <Dialog header={`${formType === FormModalType.ADD ? 'Agregar' : 'Editar'} Usuario`}
                onShow={() => {
                    if (formType === FormModalType.ADD) formik.resetForm()
                    if (formType === FormModalType.EDIT) {
                        formik.setValues({
                            dni: currentUser.dni,
                            nombres: currentUser.nombres,
                            rol: currentUser.rol,
                            usuario: currentUser.usuario,
                        })
                    }
                }}
                modal={true} draggable={false} visible={visible} onHide={() => setVisible(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex gap-3 mb-3">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="usuario">Usuario</label>
                            <InputText name="usuario"
                                value={formik.values.usuario}
                                onChange={formik.handleChange}
                                className={formik.errors.usuario
                                    && formik.touched.usuario
                                    && 'p-invalid'} />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="rol">Rol</label>
                            <Dropdown name="rol" options={roles}
                                value={formik.values.rol}
                                onChange={formik.handleChange}
                                className={formik.errors.rol
                                    && formik.touched.rol
                                    && 'p-invalid'} />
                        </div>
                    </div>
                    <div className="flex gap-3 mb-3">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="dni">D.N.I</label>
                            <InputText name="dni"
                                value={formik.values.dni}
                                onChange={formik.handleChange}
                                className={formik.errors.dni
                                    && formik.touched.dni
                                    && 'p-invalid'} />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="nombres">Nombres</label>
                            <InputText name="nombres"
                                value={formik.values.nombres}
                                onChange={formik.handleChange}
                                className={formik.errors.nombres
                                    && formik.touched.nombres
                                    && 'p-invalid'} />
                        </div>
                    </div>
                    <div className="flex justify-content-center gap-3">
                        <Button type="button" severity="secondary" size="large" label="Cancelar" onClick={() => setVisible(false)} />
                        <Button type="submit" severity="success" size="large" label="Guardar" />
                    </div>
                </form>
            </Dialog>
            <Toast ref={toast} />
        </Fragment>
    )
}