import { Fragment, useState } from "react"
import { Header, VisitanteModal } from "../../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { Panel } from "primereact/panel"

export const ListaVisitantes = () => {
    const [dates, setDates] = useState(null)
    const [products, setProducts] = useState([])
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)
    const [visible, setVisible] = useState(false)

    const onPageChange = (event) => {
        setFirst(event.first)
        setRows(event.rows)
    }

    const handleAddVisitante = () => {
        setVisible(true)
    }

    return (
        <Fragment>
            <Header />
            <Panel header="Lista de Visitantes" className="m-2">
                <h3 className="text-center">Opciones de Busqueda</h3>
                <div className="flex justify-content-center gap-3 mb-3">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Buscar" />
                    </span>
                    <Button onClick={handleAddVisitante} icon="pi pi-plus" severity="info" label="Registrar Visitante" />
                </div>
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="dni" header="D.N.I"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>
                </DataTable>
                <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
            </Panel>
            <VisitanteModal
                visible={visible}
                setVisible={setVisible}
            />
        </Fragment>
    )
}