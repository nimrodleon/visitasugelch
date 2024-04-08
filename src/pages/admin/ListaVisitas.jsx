import { Fragment, useRef, useState } from "react"
import { Header } from "../../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { RegistrarVisitaModal } from "./RegistrarVisitaModal"
import { InputTextarea } from "primereact/inputtextarea"
import { Panel } from "primereact/panel"
import { AutoComplete } from "primereact/autocomplete"
import { useFormik } from "formik"
import { buscarVisitantePorDni, getEntities } from "../../api"
import { Toast } from "primereact/toast"

export const ListaVisitas = () => {
    const [visita, setVisita] = useState({})
    const toast = useRef(null)
    const [entidades, setEntidades] = useState([])
    const [filteredEntidades, setFilteredEntidades] = useState([])



    const [dates, setDates] = useState(null)
    const [products, setProducts] = useState([])
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)
    const [visible, setVisible] = useState(false)

    const formik = useFormik({
        initialValues: {
            dni: '',
            nombres: '',
            entidad: {},

        },
        onSubmit: async (values) => {

        }
    })

    const onPageChange = (event) => {
        setFirst(event.first)
        setRows(event.rows)
    }

    const handleRegistrarVisita = () => {
        setVisible(true)
    }

    const handleGetVisitaPorDni = () => {
        buscarVisitantePorDni(formik.values.dni)
            .then(response => {
                setVisita(response)
                console.log(response)
                formik.setFieldValue('nombres', response.nombres_completos)
                getEntities(response.id).then(response => setEntidades(response))
            })
            .catch(error => {
                setVisita({})
                formik.setFieldValue('nombres', '')
                toast.current.show({ severity: 'error', summary: 'Info', detail: error.response.data.error })
            })
    }

    const searchEntidades = (event) => {
        let _filteredItems = []

        if (!event.query.trim().length) {
            _filteredItems = [...entidades]
        } else {
            _filteredItems = entidades.filter((item) => {
                return item.rzn_social.toLowerCase().startsWith(event.query.toLowerCase())
            })
        }

        setFilteredEntidades(_filteredItems);
    }

    return (
        <Fragment>
            <Header />
            <Panel header="Registrar Visita" toggleable className="m-2">
                <div className="grid gap-3 mb-3">
                    <div className="col">
                        <div className="p-inputgroup flex-1">
                            <span className="p-float-label">
                                <InputText name="dni"
                                    value={formik.values.dni}
                                    onChange={formik.handleChange}
                                    onKeyDown={(e) => e.key === 'Enter' && handleGetVisitaPorDni()}
                                    style={{ width: '100%' }} />
                                <label htmlFor="username">D.N.I</label>
                            </span>
                            <Button icon="pi pi-search" onClick={handleGetVisitaPorDni} severity="success" className="px-4" />
                        </div>
                    </div>
                    <div className="col">
                        <span className="p-float-label">
                            <InputText id="username"
                                value={formik.values.nombres}
                                readOnly
                                style={{ width: '100%' }} />
                            <label htmlFor="username">Nombres y Apellidos</label>
                        </span>
                    </div>
                    <div className="col">
                        <div className="flex gap-2">
                            <span className="p-float-label" style={{ width: '100%' }}>
                                <AutoComplete field="rzn_social" dropdown={true}
                                    value={formik.values.entidad}
                                    suggestions={filteredEntidades}
                                    completeMethod={searchEntidades}
                                    onChange={(e) => formik.setFieldValue('entidad', e.value)}
                                    style={{ width: '100%' }} inputStyle={{ width: '100%' }} />
                                <label htmlFor="username">Entidad del Visitante</label>
                            </span>
                            <Button icon="pi pi-plus" className="p-button-secondary" />
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 mb-3">
                    <div className="col">
                        <div className="flex gap-2">
                            <span className="p-float-label" style={{ width: '100%' }}>
                                <AutoComplete id="username" dropdown={true}
                                    style={{ width: '100%' }} inputStyle={{ width: '100%' }} />
                                <label htmlFor="username">Lugar y/o Oficina</label>
                            </span>
                            <Button icon="pi pi-plus" className="p-button-secondary" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="flex gap-2">
                            <span className="p-float-label" style={{ width: '100%' }}>
                                <AutoComplete id="username" dropdown={true}
                                    style={{ width: '100%' }} inputStyle={{ width: '100%' }} />
                                <label htmlFor="username">Funcionario</label>
                            </span>
                            <Button icon="pi pi-plus" className="p-button-secondary" />
                        </div>
                    </div>
                    <div className="col">
                        <span className="p-float-label">
                            <InputText id="username" style={{ width: '100%' }} />
                            <label htmlFor="username">Motivo</label>
                        </span>
                    </div>
                </div>
                <span className="p-float-label mb-3">
                    <InputTextarea autoResize style={{ width: '100%' }} />
                    <label htmlFor="username">Observación</label>
                </span>
                <div className="flex justify-content-center gap-3">
                    <Button label="Limpiar" icon="pi pi-eraser" severity="secondary" />
                    <Button label="Guardar" icon="pi pi-save" severity="success" />
                </div>
                <pre>
                    {JSON.stringify(entidades, null, 2)}
                </pre>
                <pre>
                    {JSON.stringify(formik.values, null, 2)}
                </pre>
            </Panel>
            <Panel header="Registro de Visitas" className="mx-2">
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
            <Toast ref={toast} />
            <RegistrarVisitaModal
                visible={visible}
                setVisible={setVisible}
            />
        </Fragment>
    )
}