import { Dialog } from "primereact/dialog"
import { DataTable } from "primereact/datatable"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { Fragment, useState } from "react"
import { LugarFormModal } from "./LugarFormModal"

export const ListaLugaresModal = (props) => {
    const { visible, setVisible } = props
    const [entidades, setEntidades] = useState([])
    const [lugarVisible, setLugarVisible] = useState(false)

    const showAgregarLugar = () => {
        setLugarVisible(true)
    }

    return (
        <Fragment>
            <Dialog header="Lugares y/o Oficinas del Visitante"
                visible={visible} style={{ width: '50vw' }}
                onHide={() => setVisible(false)} draggable={false}>
                <div className="flex gap-2 my-1">
                    <div className="p-inputgroup">
                        <InputText placeholder="Buscar" />
                        <Button icon="pi pi-search" />
                    </div>
                    <Button type="button" onClick={showAgregarLugar} label="Agregar" className="pr-5" icon="pi pi-plus" />
                </div>
                <DataTable value={entidades}>
                    <Column field="nombres" header="Nombres" />
                </DataTable>
            </Dialog>
            <LugarFormModal
                visible={lugarVisible}
                setVisible={setLugarVisible} />
        </Fragment>
    )
}