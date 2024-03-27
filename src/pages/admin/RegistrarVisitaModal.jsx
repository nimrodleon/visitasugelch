import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"

export const RegistrarVisitaModal = (props) => {
    const { visible, setVisible } = props

    return (
        <Dialog header="Registrar Visita" modal={true} draggable={false} visible={visible} onHide={() => setVisible(false)}>
            <div className="flex flex-column gap-3 align-items-center mt-1">
                <InputText placeholder="D.N.I" />
                <Button className="w-full" severity="warning" size="large" label="Registrar" />
            </div>
        </Dialog>
    )
}