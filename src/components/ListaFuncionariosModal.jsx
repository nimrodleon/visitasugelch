import { Dialog } from "primereact/dialog"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { Fragment, useState } from "react"
import { FuncionarioFormModal } from "./FuncionarioFormModal"

export const ListaFuncionariosModal = (props) => {
    const { visible, setVisible } = props
    const [entidades, setEntidades] = useState([])
    const [funcionarioVisible, setFuncionarioVisible] = useState(false)

    const showAgregarFuncionario = () => {
        setFuncionarioVisible(true)
    }

    return (
        <Fragment>
            <Dialog header="Lista de Funcionarios"
                visible={visible} style={{ width: '50vw' }}
                onHide={() => setVisible(false)} draggable={false}>
                <div className="flex gap-2 my-1">
                    <div className="p-inputgroup">
                        <InputText placeholder="Buscar" />
                        <Button icon="pi pi-search" />
                    </div>
                    <Button type="button" onClick={showAgregarFuncionario} label="Agregar" className="pr-5" icon="pi pi-plus" />
                </div>
                <DataTable value={entidades}>
                    <Column field="dni" header="D.N.I" />
                    <Column field="nombres" header="Nombres" />
                    <Column field="oficina" header="Oficina" />
                </DataTable>
            </Dialog>
            <FuncionarioFormModal
                visible={funcionarioVisible}
                setVisible={setFuncionarioVisible} />
        </Fragment>
    )
}