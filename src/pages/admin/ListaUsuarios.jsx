import { Fragment, useState } from "react"
import { Header } from "../../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { VisitanteModal } from "./VisitanteModal"
import { UsuarioModal } from "./UsuarioModal"

export const ListaUsuarios = () => {
    const [dates, setDates] = useState(null)
    const [products, setProducts] = useState([])
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)
    const [visible, setVisible] = useState(false)

    const onPageChange = (event) => {
        setFirst(event.first)
        setRows(event.rows)
    }

    const handleAddUsuario = () => {
        setVisible(true)
    }

    return (
        <Fragment>
            <Header />
            <main className="container">
                <h3 className="my-1">LISTA DE USUARIOS</h3>
                <div className="flex gap-3 mb-3">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Buscar" />
                    </span>
                    <Button onClick={handleAddUsuario} icon="pi pi-plus" severity="info" label="Registrar Usuario" />
                </div>
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="dni" header="D.N.I"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>
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