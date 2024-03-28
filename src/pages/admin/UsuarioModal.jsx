import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"

export const UsuarioModal = (props) => {
    const { visible, setVisible } = props

    return (
        <Dialog header="Registrar Usuario" modal={true} draggable={false} visible={visible} onHide={() => setVisible(false)}>
            <div className="flex gap-3 mb-3">
                <div className="flex flex-column gap-2">
                    <label htmlFor="dni">D.N.I</label>
                    <InputText id="dni" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="nombres">Nombres</label>
                    <InputText id="nombres" />
                </div>
            </div>
            <div className="flex gap-3 mb-3">
                <div className="flex flex-column gap-2">
                    <label htmlFor="apellidos">Apellidos</label>
                    <InputText id="apellidos" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="rol">Rol</label>
                    <Dropdown id="rol" />
                </div>
            </div>
            <div className="flex gap-3 mb-3">
                <div className="flex flex-column gap-2">
                    <label htmlFor="usuario">Usuario</label>
                    <InputText id="usuario" />
                </div>
                <div className="flex flex-column gap-2">
                    <label htmlFor="password">Contraseña</label>
                    <InputText id="password" />
                </div>
            </div>
            <div className="flex justify-content-center gap-3">
                <Button severity="secondary" size="large" label="Cancelar" />
                <Button severity="success" size="large" label="Registrar" />
            </div>
        </Dialog>
    )
}