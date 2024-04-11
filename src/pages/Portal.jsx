import { Fragment, useEffect, useState } from "react"
import { Header } from "../components"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { Paginator } from "primereact/paginator"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useNavigate } from "react-router-dom"
import { Panel } from "primereact/panel"
import { getAsistencias } from "../api"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "primereact/button"

export const Portal = () => {
    const navigate = useNavigate()
    const [asistencias, setAsistencias] = useState({ data: [] })
    const [pagination, setPagination] = useState({
        first: 0, rows: 0, totalRecords: 0
    })

    useEffect(() => {
        if (localStorage.getItem('AuthToken')) {
            navigate('/admin')
        }
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

    return (
        <Fragment>
            <Header />
            <Panel header="Registro de Visitas" className="m-2">
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
                    <Button label="Excel" severity="success" />
                </div>
                <DataTable value={asistencias.data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="fecha_registro" header="Fecha de Registro"></Column>
                    <Column field="fecha_visita" header="Fecha de Visita"></Column>
                    <Column field="nombres_visitante" header="Visitante"></Column>
                    <Column field="documento_visitante" header="Documento del visitante"></Column>
                    <Column field="rzn_social_entidad" header="Entidad del visitante"></Column>
                    <Column field="nombres_funcionario" header="Funcionario visitado"></Column>
                    <Column field="hora_ingreso" header="Hora de Ingreso"></Column>
                    <Column field="hora_salida" header="Hora de Salida"></Column>
                    <Column field="motivo_visita" header="Motivo"></Column>
                    <Column field="nombre_lugar" header="Lugar Especifico"></Column>
                    <Column field="observaciones" header="Observación"></Column>
                </DataTable>
                <Paginator
                    first={pagination.first}
                    rows={pagination.rows}
                    totalRecords={pagination.totalRecords}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange} />
            </Panel>
        </Fragment>
    )
}