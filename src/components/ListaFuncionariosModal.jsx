import { Dialog } from "primereact/dialog"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { Fragment, useState } from "react"
import { FuncionarioFormModal } from "./FuncionarioFormModal"
import { FormModalType, useFuncionarioStore } from "../store"
import { useFormik } from "formik"
import { deleteFuncionarioById, searchFuncionarios } from "../api"
import { Paginator } from "primereact/paginator"
import { confirmDialog } from "primereact/confirmdialog"

export const ListaFuncionariosModal = (props) => {
    const { visible, setVisible } = props
    const {
        funcionarios,
        setFuncionarios,
        setCurrentFuncionario,
        setFormType,
        borrarFuncionario
    } = useFuncionarioStore(state => ({
        funcionarios: state.funcionarios,
        setFuncionarios: state.setFuncionarios,
        setCurrentFuncionario: state.setCurrentFuncionario,
        setFormType: state.setFormType,
        borrarFuncionario: state.borrarFuncionario,
    }))
    const [pagination, setPagination] = useState({
        first: 0, rows: 0, totalRecords: 0
    })
    const [funcionarioVisible, setFuncionarioVisible] = useState(false)

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: async (values) => {
            try {
                const currentPage = pagination.first / pagination.rows + 1
                const response = await searchFuncionarios(values.search, currentPage, pagination.rows)
                setFuncionarios(response)
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
        searchFuncionarios(
            formik.values.search || '',
            currentPage,
            event.rows
        ).then(response => {
            setFuncionarios(response)
            setPagination({
                first: (response.current_page - 1) * response.per_page,
                rows: response.per_page,
                totalRecords: response.total
            })
        })
    }

    const showAgregarFuncionario = () => {
        setFormType(FormModalType.ADD)
        setCurrentFuncionario({})
        setFuncionarioVisible(true)
    }

    const showEditarFuncionario = (funcionario) => {
        setFormType(FormModalType.EDIT)
        setCurrentFuncionario(funcionario)
        setFuncionarioVisible(true)
    }

    const handleDeleteFuncionario = (funcionario) => {
        confirmDialog({
            message: '¿Desea eliminar este registro?',
            header: 'Confirmación de Eliminación',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                deleteFuncionarioById(funcionario.id).then(() => {
                    borrarFuncionario(funcionario.id)
                })
            }
        })
    }

    return (
        <Fragment>
            <Dialog header="Lista de Funcionarios"
                visible={visible} style={{ width: '50vw' }}
                onShow={async () => {
                    searchFuncionarios("", 1, 5).then(response => {
                        setFuncionarios(response)
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
                    <Button type="button" onClick={showAgregarFuncionario} label="Agregar" className="pr-5" icon="pi pi-plus" />
                </div>
                <DataTable value={funcionarios.data}>
                    <Column field="dni" header="D.N.I" />
                    <Column field="nombres_completos" header="Nombres" />
                    <Column field="nombre" header="Oficina" />
                    <Column body={(rowData) => (
                        <div className="flex justify-content-end gap-2">
                            <Button type="button" onClick={() => showEditarFuncionario(rowData)} icon="pi pi-pencil" rounded severity="secondary" />
                            <Button type="button" onClick={() => handleDeleteFuncionario(rowData)} icon="pi pi-trash" rounded severity="danger" />
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
            <FuncionarioFormModal
                visible={funcionarioVisible}
                setVisible={setFuncionarioVisible} />
        </Fragment>
    )
}