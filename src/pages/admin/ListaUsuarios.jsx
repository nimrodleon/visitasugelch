import { Fragment, useEffect, useState } from "react"
import { Header } from "../../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { VisitanteModal } from "./VisitanteModal"
import { UsuarioModal } from "./UsuarioModal"
import { getUsers } from "../../api"
import { useUserStore } from "../../store/user"
import { FormModalType } from "../../store"
import { useFormik } from "formik"

export const ListaUsuarios = () => {
    const users = useUserStore(state => state.users)
    const setUsers = useUserStore(state => state.setUsers)
    const setSelectedUser = useUserStore(state => state.setSelectedUser)
    const setUserFormType = useUserStore(state => state.setUserFormType)

    const [dates, setDates] = useState(null)
    const [products, setProducts] = useState([])
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        getUsers().then(data => {
            setUsers(data)
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: values => {
            getUsers(values.query).then(data => {
                setUsers(data)
            })
        }
    })

    const onPageChange = (event) => {
        setFirst(event.first)
        setRows(event.rows)
    }

    const handleAddUsuario = () => {
        setVisible(true)
        setUserFormType(FormModalType.ADD)
        setSelectedUser({})
    }

    const handleEditVisitante = (rowData) => {
        setUserFormType(FormModalType.EDIT)
        setSelectedUser(rowData)
        setVisible(true)
    }

    const handleDeleteVisitante = (rowData) => {
        console.log(rowData)
    }

    return (
        <Fragment>
            <Header />
            <main className="mx-2">
                <h3 className="my-1">LISTA DE USUARIOS</h3>
                <div className="flex gap-3 mb-3">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            name="query"
                            onChange={formik.handleChange}
                            value={formik.values.query}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    formik.handleSubmit()
                                }
                            }}
                            placeholder="Buscar" />
                    </span>
                    <Button onClick={handleAddUsuario} icon="pi pi-plus" severity="info" label="Registrar Usuario" />
                </div>
                <DataTable value={users.data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="dni" header="D.N.I"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>
                    <Column field="rol" header="Rol"></Column>
                    <Column field="usuario" header="Usuario"></Column>
                    <Column body={(rowData) => (
                        <div className="flex justify-content-end gap-2">
                            <Button icon="pi pi-pencil" rounded severity="secondary" onClick={() => handleEditVisitante(rowData)} />
                            <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDeleteVisitante(rowData)} />
                        </div>
                    )}></Column>
                </DataTable>
                <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
            </main>
            <UsuarioModal
                visible={visible}
                setVisible={setVisible}
            />
        </Fragment>
    )
}