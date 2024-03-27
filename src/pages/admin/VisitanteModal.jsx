import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"

export const VisitanteModal = (props) => {
    const { visible, setVisible } = props

    return (
        <Dialog header="Registrar Visitante" modal={true} draggable={false} visible={visible} onHide={() => setVisible(false)}>
            <div className="flex gap-3 mb-3">
                <div className="flex flex-column gap-2">
                    <label htmlFor="dni">D.N.I</label>
                    <InputText id="dni" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                    <InputText id="apellidoPaterno" />
                </div>
            </div>
            <div className="flex gap-3 mb-3">
                <div className="flex flex-column gap-2">
                    <label htmlFor="apellidoMaterno">Apellido Materno</label>
                    <InputText id="apellidoMaterno" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="nombres">Nombres</label>
                    <InputText id="nombres" />
                </div>
            </div>
            <div className="flex justify-content-center gap-3">
                <Button severity="secondary" size="large" label="Cancelar" />
                <Button severity="success" size="large" label="Registrar" />
            </div>
        </Dialog>
    )
}