import { Dialog } from "primereact/dialog"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { Fragment, useContext, useRef, useState } from "react"
import { LugarFormModal } from "./LugarFormModal"
import { useLugarStore } from "../store/lugar"
import { useFormik } from "formik"
import { deleteLugarById, searchLugares } from "../api"
import { FormModalType, UserContext } from "../store"
import { Paginator } from "primereact/paginator"
import { Toast } from "primereact/toast"
import { confirmDialog } from "primereact/confirmdialog"

export const ListaLugaresModal = (props) => {
    const { visible, setVisible } = props
    const {
        lugares,
        setLugares,
        setCurrentLugar,
        setFormType,
        borrarLugar
    } = useLugarStore(state => ({
        lugares: state.lugares,
        setLugares: state.setLugares,
        setCurrentLugar: state.setCurrentLugar,
        setFormType: state.setFormType,
        borrarLugar: state.borrarLugar,
    }))
    const toast = useRef(null)
    const { userData } = useContext(UserContext)
    const [pagination, setPagination] = useState({
        first: 0, rows: 0, totalRecords: 0
    })
    const [lugarVisible, setLugarVisible] = useState(false)

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: async (values) => {
            try {
                const currentPage = pagination.first / pagination.rows + 1
                const response = await searchLugares(values.search, currentPage, pagination.rows)
                setLugares(response)
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
        searchLugares(
            formik.values.search || '',
            currentPage,
            event.rows
        ).then(response => {
            setLugares(response)
            setPagination({
                first: (response.current_page - 1) * response.per_page,
                rows: response.per_page,
                totalRecords: response.total
            })
        })
    }

    const showAgregarLugar = () => {
        setCurrentLugar({})
        setFormType(FormModalType.ADD)
        setLugarVisible(true)
    }

    const showEditarLugar = (lugar) => {
        setCurrentLugar(lugar)
        setFormType(FormModalType.EDIT)
        setLugarVisible(true)
    }

    const handleDeleteLugar = (lugar) => {
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
                    deleteLugarById(lugar.id).then(() => {
                        borrarLugar(lugar.id)
                    })
                }
            })
        }
    }

    return (
        <Fragment>
            <Dialog header="Lugares y/o Oficinas del Visitante"
                visible={visible} style={{ width: '50vw' }}
                onShow={async () => {
                    searchLugares("", 1, 5).then(response => {
                        setLugares(response)
                        setPagination({
                            first: (response.current_page - 1) * response.per_page,
                            rows: response.per_page,
                            totalRecords: response.total
                        })
                    })
                }}
                onHide={() => setVisible(false)} draggable={false}>
                <div className="flex gap-2 my-1">
                    <div className="p-inputgroup">
                        <InputText
                            name="search"
                            value={formik.values.search}
                            onChange={formik.handleChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') formik.handleSubmit() }}
                            placeholder="Buscar" />
                        <Button type="button" onClick={() => formik.handleSubmit()} icon="pi pi-search" />
                    </div>
                    <Button type="button" onClick={showAgregarLugar} label="Agregar" className="pr-5" icon="pi pi-plus" />
                </div>
                <DataTable value={lugares.data}>
                    <Column field="nombre" header="Nombres" />
                    <Column body={(rowData) => (
                        <div className="flex justify-content-end gap-2">
                            <Button type="button" onClick={() => showEditarLugar(rowData)} icon="pi pi-pencil" rounded severity="secondary" />
                            <Button type="button" onClick={() => handleDeleteLugar(rowData)} icon="pi pi-trash" rounded severity="danger" />
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
            <LugarFormModal
                visible={lugarVisible}
                setVisible={setLugarVisible} />
            <Toast ref={toast} />
        </Fragment>
    )
}