import { Fragment, useEffect, useState } from "react"
import { Header } from "../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Paginator } from "primereact/paginator"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useNavigate } from "react-router-dom"

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
            <main className="container">
                <h3 className="my-1">REGISTRO DE VISITAS</h3>
                <div className="flex gap-3 mb-3">
                    <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" showIcon />
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Buscar" />
                    </span>
                </div>
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="dni" header="D.N.I"></Column>
                    <Column field="nombres" header="Nombres"></Column>
                    <Column field="apellidos" header="Apellidos"></Column>
                    <Column field="fecha" header="Fecha"></Column>
                    <Column field="hora" header="Hora"></Column>
                </DataTable>
                <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
            </main>
        </Fragment>
    )
}