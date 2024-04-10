import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import * as Yup from "yup"
import { useEffect } from "react"
import { FormModalType, useUserStore } from "../store"
import { createUser } from "../api"

const UserSchema = Yup.object().shape({
    dni: Yup.string().required('D.N.I es requerido'),
    nombres: Yup.string().required('Nombres es requerido'),
    apellidos: Yup.string().required('Apellidos es requerido'),
    rol: Yup.string().required('Rol es requerido'),
    usuario: Yup.string().required('Usuario es requerido'),
    password: Yup.string().required('Contraseña es requerido')
})

export const UsuarioModal = (props) => {
    const { visible, setVisible } = props
    const selectedUser = useUserStore(state => state.selectedUser)
    const userFormType = useUserStore(state => state.userFormType)

    const formik = useFormik({
        initialValues: {
            dni: '',
            nombres: '',
            apellidos: '',
            rol: '',
            usuario: '',
            password: ''
        },
        validationSchema: UserSchema,
        onSubmit: values => {
            if (userFormType === FormModalType.ADD) {
                createUser(values).then(response => {
                    console.log(response)
                    setVisible(false)
                })
            }
        }
    })

    const roles = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
    ]

    return (
        <Dialog header={`${userFormType === FormModalType.ADD ? 'Agregar' : 'Editar'} Usuario`}
            onShow={() => {
                if (userFormType === FormModalType.EDIT
                    && selectedUser && selectedUser.id !== 0) {
                    formik.setValues({
                        dni: selectedUser.dni,
                        nombres: selectedUser.nombres,
                        apellidos: selectedUser.apellidos,
                        rol: selectedUser.rol,
                        usuario: selectedUser.usuario,
                        password: ''
                    })
                }
            }}
            modal={true} draggable={false} visible={visible} onHide={() => {
                formik.resetForm()
                setVisible(false)
            }}>
            <form onSubmit={formik.handleSubmit}>
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
                <div className="flex gap-3 mb-3">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="apellidos">Apellidos</label>
                        <InputText id="apellidos"
                            value={formik.values.apellidos}
                            onChange={formik.handleChange}
                            className={formik.errors.apellidos
                                && formik.touched.apellidos
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
                        <label htmlFor="usuario">Usuario</label>
                        <InputText name="usuario"
                            value={formik.values.usuario}
                            onChange={formik.handleChange}
                            className={formik.errors.usuario
                                && formik.touched.usuario
                                && 'p-invalid'} />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="password">Contraseña</label>
                        <InputText name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className={formik.errors.password
                                && formik.touched.password
                                && 'p-invalid'} />
                    </div>
                </div>
                <div className="flex justify-content-center gap-3">
                    <Button type="button" severity="secondary" size="large" label="Cancelar" onClick={() => setVisible(false)} />
                    <Button type="submit" severity="success" size="large" label="Registrar" />
                </div>
            </form>
        </Dialog>
    )
}