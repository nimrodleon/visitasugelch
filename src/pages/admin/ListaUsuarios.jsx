import { Fragment, useEffect, useState } from "react"
import { Header, PasswordChangeModal, UsuarioModal } from "../../components"
import { InputText } from "primereact/inputtext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { deleteUserById, getUsers } from "../../api"
import { useUserStore } from "../../store/user"
import { FormModalType } from "../../store"
import { useFormik } from "formik"
import { Panel } from "primereact/panel"
import { confirmDialog } from "primereact/confirmdialog"

export const ListaUsuarios = () => {
    const {
        users,
        setUsers,
        setCurrentUser,
        setFormType,
        deleteUser,
    } = useUserStore(state => ({
        users: state.users,
        setUsers: state.setUsers,
        setCurrentUser: state.setCurrentUser,
        setFormType: state.setFormType,
        deleteUser: state.deleteUser,
    }))
    const [pagination, setPagination] = useState({
        first: 0, rows: 0, totalRecords: 0
    })
    const [visible, setVisible] = useState(false)
    const [passwordChangeVisible, setPasswordChangeVisible] = useState(false)

    useEffect(() => {
        getUsers().then(result => {
            setUsers(result)
            setPagination({
                first: (result.current_page - 1) * result.per_page,
                rows: result.per_page,
                totalRecords: result.total
            })
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: values => {
            const currentPage = pagination.first / pagination.rows + 1
            getUsers(
                values.search || '',
                currentPage,
                pagination.rows
            ).then(result => {
                setUsers(result)
                setPagination({
                    first: (result.current_page - 1) * result.per_page,
                    rows: result.per_page,
                    totalRecords: result.total
                })
            })
        }
    })

    const onPageChange = (event) => {
        const currentPage = event.first / event.rows + 1
        getUsers(
            formik.values.search || '',
            currentPage,
            event.rows
        ).then(response => {
            setUsers(response)
            setPagination({
                first: (response.current_page - 1) * response.per_page,
                rows: response.per_page,
                totalRecords: response.total
            })
        })
    }

    const showAddUser = () => {
        setVisible(true)
        setFormType(FormModalType.ADD)
        setCurrentUser({})
    }

    const showEditUser = (user) => {
        setFormType(FormModalType.EDIT)
        setCurrentUser(user)
        setVisible(true)
    }

    const handleDeleteUser = (user) => {
        confirmDialog({
            message: '¿Desea eliminar este registro?',
            header: 'Confirmación de Eliminación',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                deleteUserById(user.id).then(() => {
                    deleteUser(user.id)
                })
            }
        })
    }

    const handleChangePassword = (user) => {
        confirmDialog({
            message: '¿Desea cambiar la contraseña de este usuario?',
            header: 'Confirmación de Cambio de Contraseña',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-success',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                setCurrentUser(user)
                setPasswordChangeVisible(true)
            }
        })
    }

    return (
        <Fragment>
            <Header />
            <Panel header="Lista de Usuarios" className="m-2">
                <h3 className="text-center">Opciones de Busqueda</h3>
                <div className="flex justify-content-center gap-3 mb-3">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            name="search"
                            onChange={formik.handleChange}
                            value={formik.values.search}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    formik.handleSubmit()
                                }
                            }}
                            placeholder="Buscar" />
                    </span>
                    <Button onClick={showAddUser} icon="pi pi-plus" severity="info" label="Registrar Usuario" />
                </div>
                <DataTable value={users.data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="dni" header="D.N.I"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="rol" header="Rol"></Column>
                    <Column field="usuario" header="Usuario"></Column>
                    <Column body={(rowData) => (
                        <div className="flex justify-content-end gap-2">
                            <Button icon="pi pi-lock" rounded severity="info" onClick={() => handleChangePassword(rowData)} />
                            <Button icon="pi pi-pencil" rounded severity="secondary" onClick={() => showEditUser(rowData)} />
                            <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDeleteUser(rowData)} />
                        </div>
                    )}></Column>
                </DataTable>
                <Paginator
                    first={pagination.first}
                    rows={pagination.rows}
                    totalRecords={pagination.totalRecords}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange} />
            </Panel>
            <UsuarioModal
                visible={visible}
                setVisible={setVisible}
            />
            <PasswordChangeModal
                visible={passwordChangeVisible}
                setVisible={setPasswordChangeVisible} />
        </Fragment>
    )
}