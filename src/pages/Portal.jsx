import { Fragment, useEffect, useState } from "react"
import { Header } from "../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Paginator } from "primereact/paginator"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useNavigate } from "react-router-dom"
import { Panel } from "primereact/panel"

export const Portal = () => {
    const navigate = useNavigate()
    const [dates, setDates] = useState(null)
    const [products, setProducts] = useState([])
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)

    useEffect(() => {
        if (localStorage.getItem('AuthToken')) {
            navigate('/admin')
        }
    }, [])

    const onPageChange = (event) => {
        setFirst(event.first)
        setRows(event.rows)
    }

    return (
        <Fragment>
            <Header />
            <Panel header="Registro de Visitas" className="m-2">
                <h3 className="text-center">Opciones de Busqueda</h3>
                <div className="flex justify-content-center gap-3 mb-3">
                    <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" showIcon />
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Buscar" />
                    </span>
                </div>
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="fecha_registro" header="Fecha de Registro"></Column>
                    <Column field="fecha_visita" header="Fecha de Visita"></Column>
                    <Column field="entidad_visitada" header="Entidad Visitada"></Column>
                    <Column field="visitante" header="Visitante"></Column>
                    <Column field="dni" header="Documento del visitante"></Column>
                    <Column field="entidad_del_visitante" header="Entidad del visitante"></Column>
                    <Column field="funcionario" header="Funcionario visitado"></Column>
                    <Column field="hora_ingreso" header="Hora de Ingreso"></Column>
                    <Column field="hora_salida" header="Hora de Salida"></Column>
                    <Column field="motivo" header="Motivo"></Column>
                    <Column field="lugar" header="Lugar Especifico"></Column>
                    <Column field="observación" header="Observación"></Column>
                </DataTable>
                <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
            </Panel>
        </Fragment>
    )
}