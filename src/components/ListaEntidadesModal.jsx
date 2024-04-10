import { Dialog } from "primereact/dialog"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { Fragment, useState } from "react"
import { EntidadFormModal } from "./EntidadFormModal"

export const ListaEntidadesModal = (props) => {
    const { visible, setVisible } = props
    const [entidades, setEntidades] = useState([])
    const [entidadFormVisible, setEntidadFormVisible] = useState(false)

    const showAgregarEntidad = () => {
        setEntidadFormVisible(true)
    }

    return (
        <Fragment>
            <Dialog header="Entidades del Visitante"
                visible={visible} style={{ width: '50vw' }}
                onHide={() => setVisible(false)} draggable={false}>
                <div className="flex gap-2 my-1">
                    <div className="p-inputgroup">
                        <InputText placeholder="Buscar" />
                        <Button icon="pi pi-search" />
                    </div>
                    <Button type="button" onClick={showAgregarEntidad}
                        label="Agregar" className="pr-5" icon="pi pi-plus" />
                </div>
                <DataTable value={entidades}>
                    <Column field="ruc" header="R.U.C" />
                    <Column field="rzn_social" header="Razón Social" />
                </DataTable>
            </Dialog>
            <EntidadFormModal
                visible={entidadFormVisible}
                setVisible={setEntidadFormVisible} />
        </Fragment>
    )
}