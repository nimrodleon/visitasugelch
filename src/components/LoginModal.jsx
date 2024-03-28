import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"

export const LoginModal = (props) => {
    const { visible, setVisible } = props

    return (
        <Dialog header="Iniciar Sessión" modal={true} draggable={false} visible={visible} onHide={() => setVisible(false)}>
            <div className="flex flex-column gap-3 align-items-center mt-1">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Usuario" />
                </div>
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-lock"></i>
                    </span>
                    <Password placeholder="Contraseña" />
                </div>
                <Button className="w-full" severity="secondary" size="large" label="Iniciar Sessión" />
            </div>
        </Dialog>
    )
}