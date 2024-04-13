import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Header, ListaEntidadesModal, ListaFuncionariosModal, ListaLugaresModal } from "../../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"
import { Panel } from "primereact/panel"
import { AutoComplete } from "primereact/autocomplete"
import { useFormik } from "formik"
import { buscarVisitantePorDni, createAsistencia, deleteAsistencia, getAllLugares, getAsistencias, getEntities, getFuncionariosByLugarId, marcarHoraSalida } from "../../api"
import { Toast } from "primereact/toast"
import { v4 as uuidv4 } from "uuid"
import * as Yup from "yup"
import { InputDialog } from "../../components/InputDialog"
import { UserContext } from "../../store"
import { confirmDialog } from "primereact/confirmdialog"
import { useAsistenciaStore } from "../../store/asistencia"

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
    const {
        visita,
        setVisita,
        entidades,
        setEntidades,
        lugares,
        setLugares,
        funcionarios,
        setFuncionarios,
    } = useAsistenciaStore(state => ({
        visita: state.visita,
        setVisita: state.setVisita,
        entidades: state.entidades,
        setEntidades: state.setEntidades,
        lugares: state.lugares,
        setLugares: state.setLugares,
        funcionarios: state.funcionarios,
        setFuncionarios: state.setFuncionarios,
    }))
    const toast = useRef(null)
    const { userData } = useContext(UserContext)
    const [filteredEntidades, setFilteredEntidades] = useState([])
    const [filteredLugares, setFilteredLugares] = useState([])
    const [filteredFuncionarios, setFilteredFuncionarios] = useState([])
    const [asistencias, setAsistencias] = useState({ data: [] })
    const [pagination, setPagination] = useState({
        first: 0, rows: 0, totalRecords: 0
    })
    const [visible, setVisible] = useState(false)
    const [inputDialogData, setInputDialogData] = useState({
        title: '', label: '', value: '', origin: ''
    })
    // ===================== modales =====================
    const [visibleEntidades, setVisibleEntidades] = useState(false)
    const [visibleLugares, setVisibleLugares] = useState(false)
    const [visibleFuncionarios, setVisibleFuncionarios] = useState(false)

    useEffect(() => {
        getAllLugares().then(response => setLugares(response))
    }, [])

    useEffect(() => {
        getAsistencias(
            new Date(new Date().setDate(new Date().getDate() - 15)),
            new Date(),
            '',
            1,
            10,
        ).then(response => {
            setAsistencias(response)
            setPagination({
                first: (response.current_page - 1) * response.per_page,
                rows: response.per_page,
                totalRecords: response.total
            })
        })
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
            const formData = {
                'visitante_id': visita.id,
                'nombres_visitante': visita.nombres_completos,
                'documento_visitante': visita.dni,
                'entidad_id': values.entidad.id,
                'rzn_social_entidad': values.entidad.rzn_social,
                'funcionario_id': values.funcionario.id,
                'nombres_funcionario': values.funcionario.nombres_completos,
                'motivo_visita': values.motivo,
                'lugar_id': values.lugar.id,
                'nombre_lugar': values.lugar.nombre,
                'observaciones': values.observacion,
            }
            createAsistencia(formData)
                .then(response => {
                    setAsistencias({
                        ...asistencias,
                        data: [
                            response, ...asistencias.data
                        ]
                    })
                    handleResetForm()
                })
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

    const queryForm = useFormik({
        initialValues: {
            dates: [
                new Date(new Date().setDate(new Date().getDate() - 15)),
                new Date()
            ],
            search: ''
        },
        validationSchema: Yup.object().shape({
            dates: Yup.array().of(Yup.date())
                .min(2, 'Fechas debe tener dos elementos')
                .max(2, 'Fechas debe tener dos elementos')
                .required('Fechas es requerido'),
            search: Yup.string()
        }),
        onSubmit: async (values) => {
            const currentPage = pagination.first / pagination.rows + 1
            getAsistencias(
                values.dates[0],
                values.dates[1],
                values.search || '',
                currentPage,
                pagination.rows
            ).then(response => {
                setAsistencias(response)
                setPagination({
                    first: (response.current_page - 1) * response.per_page,
                    rows: response.per_page,
                    totalRecords: response.total
                })
            })
        }
    })

    const onPageChange = (event) => {
        const currentPage = event.first / event.rows + 1
        getAsistencias(
            queryForm.values.dates[0],
            queryForm.values.dates[1],
            queryForm.values.search || '',
            currentPage,
            event.rows
        ).then(response => {
            setAsistencias(response)
            setPagination({
                first: (response.current_page - 1) * response.per_page,
                rows: response.per_page,
                totalRecords: response.total
            })
        })
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
                return item.rzn_social.toLowerCase().includes(event.query.toLowerCase())
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
                return item.nombre.toLowerCase().includes(event.query.toLowerCase())
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
                return item.nombres_completos.toLowerCase().includes(event.query.toLowerCase())
            })
        }

        setFilteredFuncionarios(_filteredItems)
    }

    const agregarEntidad = () => {
        setInputDialogData({
            title: 'Agregar Entidad',
            label: 'Ingrese nombre de la entidad',
            value: '',
            origin: 'ENTIDAD'
        })
        setVisible(true)
    }

    const showModalEntidades = () => {
        setVisibleEntidades(true)
    }

    const agregarLugar = () => {
        setInputDialogData({
            title: 'Agregar Lugar y/o Oficina',
            label: 'Ingrese nombre de la Oficina',
            value: '',
            origin: 'LUGAR'
        })
        setVisible(true)
    }

    const showModalLugares = () => {
        setVisibleLugares(true)
    }

    const agregarFuncionario = () => {
        setInputDialogData({
            title: 'Agregar Funcionario',
            label: 'Ingrese nombre del Funcionario',
            value: '',
            origin: 'FUNCIONARIO'
        })
        setVisible(true)
    }

    const showModalFuncionarios = () => {
        setVisibleFuncionarios(true)
    }

    const saveChangesDialog = (data) => {
        console.log(data)
    }

    const handleMarcarHoraSalida = (asistencia) => {
        confirmDialog({
            header: 'Confirmación',
            message: '¿Está seguro de marcar la hora de salida?',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                marcarHoraSalida(asistencia.id).then(response => {
                    const newData = asistencias.data.map(item => {
                        if (item.id === asistencia.id) {
                            return response
                        }
                        return item
                    })
                    setAsistencias({ ...asistencias, data: newData })
                })
            },
        })
    }

    const handleDeleteAsistencia = (asistencia) => {
        if (userData.rol !== 'admin') {
            toast.current.show({ severity: 'error', summary: 'Info', detail: 'No tiene los permisos requeridos!' })
        } else {
            confirmDialog({
                message: '¿Desea eliminar este registro?',
                header: 'Confirmación de Eliminación',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                acceptLabel: 'Si',
                rejectLabel: 'No',
                accept: () => {
                    deleteAsistencia(asistencia.id).then(() => {
                        const newData = asistencias.data.filter(asist => asist.id !== asistencia.id)
                        setAsistencias({ ...asistencias, data: newData })
                    })
                }
            })
        }
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
                                <Button type="button"
                                    onClick={showModalEntidades}
                                    disabled={!visita.id}
                                    severity="info"
                                    icon="pi pi-cog" />
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
                                <Button
                                    type="button"
                                    onClick={showModalLugares}
                                    disabled={userData.rol !== 'admin'}
                                    severity="info"
                                    icon="pi pi-cog" />
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
                                <Button
                                    type="button"
                                    onClick={showModalFuncionarios}
                                    disabled={userData.rol !== 'admin'}
                                    severity="info"
                                    icon="pi pi-cog" />
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
                    <Calendar
                        value={queryForm.values.dates}
                        onChange={async (e) => {
                            queryForm.handleChange('dates')(e)
                            try {
                                await queryForm.validateForm()
                                queryForm.handleSubmit()
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                        className={queryForm.errors.dates
                            && queryForm.touched.dates
                            && 'p-invalid'}
                        selectionMode="range" showIcon />
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={queryForm.values.search}
                            onChange={queryForm.handleChange('search')}
                            onKeyDown={(e) => e.key === 'Enter' && queryForm.handleSubmit()}
                            placeholder="Buscar" />
                    </span>
                </div>
                <DataTable value={asistencias.data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="fecha_registro" header="Fecha de Registro"></Column>
                    <Column field="fecha_visita" header="Fecha de Visita"></Column>
                    <Column field="nombres_visitante" header="Visitante"></Column>
                    <Column field="documento_visitante" header="Documento del visitante"></Column>
                    <Column field="rzn_social_entidad" header="Entidad del visitante"></Column>
                    <Column field="nombres_funcionario" header="Funcionario visitado"></Column>
                    <Column field="hora_ingreso" header="Hora de Ingreso"></Column>
                    <Column header="Hora de Salida" body={(rowData) => (
                        !rowData.hora_salida ? (
                            <Button type="button" onClick={() =>
                                handleMarcarHoraSalida(rowData)} icon="pi pi-check-circle" rounded severity="info" />
                        ) : rowData.hora_salida
                    )} />
                    <Column field="motivo_visita" header="Motivo"></Column>
                    <Column field="nombre_lugar" header="Lugar Especifico"></Column>
                    <Column field="observaciones" header="Observación"></Column>
                    <Column body={(rowData) => (
                        <div className="flex justify-content-end gap-2">
                            <Button type="button" onClick={() => handleDeleteAsistencia(rowData)} icon="pi pi-trash" rounded severity="danger" />
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
            <Toast ref={toast} />
            <InputDialog
                visible={visible}
                setVisible={setVisible}
                data={inputDialogData}
                saveChanges={saveChangesDialog} />
            <ListaEntidadesModal
                visible={visibleEntidades}
                setVisible={setVisibleEntidades} />
            <ListaLugaresModal
                visible={visibleLugares}
                setVisible={setVisibleLugares} />
            <ListaFuncionariosModal
                visible={visibleFuncionarios}
                setVisible={setVisibleFuncionarios} />
        </Fragment>
    )
}