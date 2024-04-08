import { Fragment, useEffect, useRef, useState } from "react"
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
import { buscarVisitantePorDni, getAllLugares, getEntities, getFuncionariosByLugarId } from "../../api"
import { Toast } from "primereact/toast"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"

const VisitaSchema = Yup.object().shape({
    dni: Yup.string().required('D.N.I es requerido'),
    nombres: Yup.string().required('Nombres es requerido'),
    entidad: Yup.object().shape({
        id: Yup.number().required('Entidad es requerido'),
    }).required('Entidad es requerido'),
    lugar: Yup.object().shape({
        id: Yup.number().required('Lugar es requerido'),
    }).required('Lugar es requerido'),
    funcionario: Yup.object().shape({
        id: Yup.number().required('Funcionario es requerido'),
    }).required('Funcionario es requerido'),
    motivo: Yup.string().required('Motivo es requerido'),
    observacion: Yup.string()
})

export const ListaVisitas = () => {
    const [uuid, setUuid] = useState(uuidv4())
    const [visita, setVisita] = useState({})
    const toast = useRef(null)
    const [entidades, setEntidades] = useState([])
    const [filteredEntidades, setFilteredEntidades] = useState([])
    const [lugares, setLugares] = useState([])
    const [filteredLugares, setFilteredLugares] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [filteredFuncionarios, setFilteredFuncionarios] = useState([])


    const [dates, setDates] = useState(null)
    const [products, setProducts] = useState([])
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        getAllLugares().then(response => setLugares(response))
    }, [])

    const formik = useFormik({
        initialValues: {
            dni: '',
            nombres: '',
            entidad: {},
            lugar: {},
            funcionario: {},
            motivo: '',
            observacion: ''
        },
        validationSchema: VisitaSchema,
        onSubmit: async (values) => {
            console.log(values)
        }
    })

    const handleResetForm = () => {
        setVisita({})
        setEntidades([])
        setFilteredEntidades([])
        setFuncionarios([])
        setFilteredFuncionarios([])
        formik.resetForm()
        setUuid(uuidv4())
    }

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

    const searchLugares = (event) => {
        let _filteredItems = []

        if (!event.query.trim().length) {
            _filteredItems = [...lugares]
        } else {
            _filteredItems = lugares.filter((item) => {
                return item.nombre.toLowerCase().startsWith(event.query.toLowerCase())
            })
        }

        setFilteredLugares(_filteredItems)
    }

    const searchFuncionarios = (event) => {
        let _filteredItems = []

        if (!event.query.trim().length) {
            _filteredItems = [...funcionarios]
        } else {
            _filteredItems = funcionarios.filter((item) => {
                return item.nombres_completos.toLowerCase().startsWith(event.query.toLowerCase())
            })
        }

        setFilteredFuncionarios(_filteredItems)
    }



    return (
        <Fragment key={uuid}>
            <Header />
            <Panel header="Registrar Visita" toggleable className="m-2">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-3 mb-3">
                        <div className="col">
                            <div className="p-inputgroup flex-1">
                                <span className="p-float-label">
                                    <InputText name="dni"
                                        value={formik.values.dni}
                                        onChange={formik.handleChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleGetVisitaPorDni()}
                                        className={formik.errors.dni
                                            && formik.touched.dni
                                            && 'p-invalid'}
                                        style={{ width: '100%' }} />
                                    <label htmlFor="username">D.N.I</label>
                                </span>
                                <Button type="button" icon="pi pi-search" onClick={handleGetVisitaPorDni} severity="success" className="px-4" />
                            </div>
                        </div>
                        <div className="col">
                            <span className="p-float-label">
                                <InputText id="username"
                                    value={formik.values.nombres}
                                    readOnly
                                    className={formik.errors.nombres
                                        && formik.touched.nombres
                                        && 'p-invalid'}
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
                                        className={formik.errors.entidad
                                            && formik.touched.entidad
                                            && 'p-invalid'}
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
                                    <AutoComplete field="nombre" dropdown={true}
                                        value={formik.values.lugar}
                                        suggestions={filteredLugares}
                                        completeMethod={searchLugares}
                                        onChange={(e) => {
                                            formik.setFieldValue('lugar', e.value)
                                            getFuncionariosByLugarId(e.value.id).then(response => setFuncionarios(response))
                                        }}
                                        className={formik.errors.lugar
                                            && formik.touched.lugar
                                            && 'p-invalid'}
                                        style={{ width: '100%' }} inputStyle={{ width: '100%' }} />
                                    <label htmlFor="username">Lugar y/o Oficina</label>
                                </span>
                                <Button icon="pi pi-plus" className="p-button-secondary" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="flex gap-2">
                                <span className="p-float-label" style={{ width: '100%' }}>
                                    <AutoComplete field="nombres_completos" dropdown={true}
                                        value={formik.values.funcionario}
                                        suggestions={filteredFuncionarios}
                                        completeMethod={searchFuncionarios}
                                        onChange={(e) => formik.setFieldValue('funcionario', e.value)}
                                        className={formik.errors.funcionario
                                            && formik.touched.funcionario
                                            && 'p-invalid'}
                                        style={{ width: '100%' }} inputStyle={{ width: '100%' }} />
                                    <label htmlFor="username">Funcionario</label>
                                </span>
                                <Button icon="pi pi-plus" className="p-button-secondary" />
                            </div>
                        </div>
                        <div className="col">
                            <span className="p-float-label">
                                <InputText name="motivo"
                                    value={formik.values.motivo}
                                    onChange={formik.handleChange}
                                    style={{ width: '100%' }}
                                    className={formik.errors.motivo
                                        && formik.touched.motivo
                                        && 'p-invalid'} />
                                <label htmlFor="username">Motivo</label>
                            </span>
                        </div>
                    </div>
                    <span className="p-float-label mb-3">
                        <InputTextarea
                            name="observacion" autoResize
                            value={formik.values.observacion}
                            onChange={formik.handleChange}
                            style={{ width: '100%' }} />
                        <label htmlFor="username">Observación</label>
                    </span>
                    <div className="flex justify-content-center gap-3">
                        <Button type="button" onClick={handleResetForm} label="Limpiar" icon="pi pi-eraser" severity="secondary" />
                        <Button type="submit" label="Guardar" icon="pi pi-save" severity="success" />
                    </div>
                </form>
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