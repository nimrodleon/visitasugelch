import { Dialog } from "primereact/dialog"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { Fragment, useContext, useState } from "react"
import { EntidadFormModal } from "./EntidadFormModal"
import { FormModalType, UserContext, useAsistenciaStore } from "../store"
import { useFormik } from "formik"
import { deleteEntity, searchEntidades } from "../api"
import { useEntidadStore } from "../store/entidad"
import { Paginator } from "primereact/paginator"
import { confirmDialog } from "primereact/confirmdialog"

export const ListaEntidadesModal = (props) => {
    const { visible, setVisible } = props
    const {
        visita,
    } = useAsistenciaStore(state => ({
        visita: state.visita,
    }))
    const {
        entidades,
        setEntidades,
        setCurrentEntidad,
        setFormType,
        borrarEntidad,
    } = useEntidadStore(state => ({
        entidades: state.entidades,
        setEntidades: state.setEntidades,
        setCurrentEntidad: state.setCurrentEntidad,
        setFormType: state.setFormType,
        borrarEntidad: state.borrarEntidad,
    }))
    const [pagination, setPagination] = useState({
        first: 0, rows: 0, totalRecords: 0
    })
    const [entidadFormVisible, setEntidadFormVisible] = useState(false)
    const { userData } = useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: async (values) => {
            try {
                const currentPage = pagination.first / pagination.rows + 1
                const response = await searchEntidades(visita.id, values.search, currentPage, pagination.rows)
                setEntidades(response)
                setPagination({
                    first: (response.current_page - 1) * response.per_page,
                    rows: response.per_page,
                    totalRecords: response.total
                })
            } catch (error) {
                console.error(error)
            }
        }
    })

    const onPageChange = (event) => {
        const currentPage = event.first / event.rows + 1
        searchEntidades(
            visita.id,
            formik.values.search || '',
            currentPage,
            event.rows
        ).then(response => {
            setEntidades(response)
            setPagination({
                first: (response.current_page - 1) * response.per_page,
                rows: response.per_page,
                totalRecords: response.total
            })
        })
    }

    const showAgregarEntidad = () => {
        setCurrentEntidad({})
        setFormType(FormModalType.ADD)
        setEntidadFormVisible(true)
    }

    const showEditarEntidad = (entidad) => {
        setCurrentEntidad(entidad)
        setFormType(FormModalType.EDIT)
        setEntidadFormVisible(true)
    }

    const handleDeleteEntidad = (entidad) => {
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
                    deleteEntity(entidad.id).then(() => {
                        borrarEntidad(entidad.id)
                    })
                }
            })
        }

    }

    return (
        <Fragment>
            <Dialog header={`Entidades del Visitante | ${visita.nombres_completos}`}
                visible={visible} style={{ width: '50vw' }}
                onShow={() => {
                    searchEntidades(visita.id, "", 1, 5).then(response => {
                        setEntidades(response)
                        setPagination({
                            first: (response.current_page - 1) * response.per_page,
                            rows: response.per_page,
                            totalRecords: response.total
                        })
                    })
                }} onHide={() => setVisible(false)} draggable={false}>
                <div className="flex gap-2 my-1">
                    <div className="p-inputgroup">
                        <InputText
                            name="search"
                            value={formik.values.search}
                            onChange={formik.handleChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') formik.handleSubmit() }}
                            placeholder="Buscar" />
                        <Button type="button" onClick={formik.handleSubmit} icon="pi pi-search" />
                    </div>
                    <Button type="button" onClick={showAgregarEntidad}
                        label="Agregar" className="pr-5" icon="pi pi-plus" />
                </div>
                <DataTable value={entidades.data}>
                    <Column field="ruc" header="R.U.C" />
                    <Column field="rzn_social" header="Razón Social" />
                    <Column body={(rowData) => (
                        <div className="flex justify-content-end gap-2">
                            <Button type="button" onClick={() => showEditarEntidad(rowData)} icon="pi pi-pencil" rounded severity="secondary" />
                            <Button type="button" onClick={() => handleDeleteEntidad(rowData)} icon="pi pi-trash" rounded severity="danger" />
                        </div>
                    )} />
                </DataTable>
                <Paginator
                    first={pagination.first}
                    rows={pagination.rows}
                    totalRecords={pagination.totalRecords}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageChange={onPageChange} />
            </Dialog>
            <EntidadFormModal
                visible={entidadFormVisible}
                setVisible={setEntidadFormVisible} />
        </Fragment>
    )
}