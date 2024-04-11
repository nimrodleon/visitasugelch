import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Header, VisitanteModal } from "../../components"
import { InputText } from "primereact/inputtext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Paginator } from "primereact/paginator"
import { Button } from "primereact/button"
import { Panel } from "primereact/panel"
import { deleteVisitante, getVisitantes } from "../../api"
import { useFormik } from "formik"
import { FormModalType, UserContext, useVisitanteStore } from "../../store"
import { confirmDialog } from "primereact/confirmdialog"
import { Toast } from "primereact/toast"

export const ListaVisitantes = () => {
    const toast = useRef(null)
    const { userData } = useContext(UserContext)
    const [pagination, setPagination] = useState({
        first: 0, rows: 0, totalRecords: 0
    })
    const [visible, setVisible] = useState(false)
    const {
        setCurrentVisitante,
        setFormType,
        visitantes,
        setVisitantes,
        borrarVisitante,
    } = useVisitanteStore(state => ({
        setCurrentVisitante: state.setCurrentVisitante,
        setFormType: state.setFormType,
        visitantes: state.visitantes,
        setVisitantes: state.setVisitantes,
        borrarVisitante: state.borrarVisitante,
    }))

    useEffect(() => {
        getVisitantes().then(result => {
            setVisitantes(result)
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
        onSubmit: (values) => {
            const currentPage = pagination.first / pagination.rows + 1
            getVisitantes(
                values.search || '',
                currentPage,
                pagination.rows
            ).then(response => {
                setVisitantes(response)
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
        getVisitantes(
            formik.values.search || '',
            currentPage,
            event.rows
        ).then(response => {
            setVisitantes(response)
            setPagination({
                first: (response.current_page - 1) * response.per_page,
                rows: response.per_page,
                totalRecords: response.total
            })
        })
    }

    const showAgregarVisitante = () => {
        setFormType(FormModalType.ADD)
        setCurrentVisitante({})
        setVisible(true)
    }

    const showEditarVisitante = (visitante) => {
        setFormType(FormModalType.EDIT)
        setCurrentVisitante(visitante)
        setVisible(true)
    }

    const handleDeleteVisitante = (visitante) => {
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
                    deleteVisitante(visitante.id).then(() => {
                        borrarVisitante(visitante.id)
                    })
                }
            })
        }
    }

    return (
        <Fragment>
            <Header />
            <Panel header="Lista de Visitantes" className="m-2">
                <h3 className="text-center">Opciones de Busqueda</h3>
                <form onSubmit={formik.handleSubmit} className="flex justify-content-center gap-3 mb-3">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            name="search"
                            value={formik.values.search}
                            onChange={formik.handleChange}
                            onKeyDown={(e) => e.key === 'Enter' && formik.handleSubmit()}
                            placeholder="Buscar" />
                    </span>
                    <Button type="button" onClick={showAgregarVisitante} icon="pi pi-plus" severity="info" label="Registrar Visitante" />
                </form>
                <DataTable value={visitantes.data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="dni" header="D.N.I" />
                    <Column field="nombres_completos" header="Nombres" />
                    <Column body={(rowData) => (
                        <div className="flex justify-content-end gap-2">
                            <Button type="button" onClick={() => showEditarVisitante(rowData)} icon="pi pi-pencil" rounded severity="secondary" />
                            <Button type="button" onClick={() => handleDeleteVisitante(rowData)} icon="pi pi-trash" rounded severity="danger" />
                        </div>
                    )} />
                </DataTable>
                <Paginator
                    first={pagination.first}
                    rows={pagination.rows}
                    totalRecords={pagination.totalRecords}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange} />
            </Panel>
            <VisitanteModal
                visible={visible}
                setVisible={setVisible}
            />
            <Toast ref={toast} />
        </Fragment>
    )
}