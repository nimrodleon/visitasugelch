import image from "../assets/header.jfif"
import { Button } from 'primereact/button'

export const Header = () => {
    return (
        <header className="grid container">
            <div className="col">
                <img src={image} alt="header" style={{
                    width: 600,
                    height: 'auto'
                }} />
            </div>
            <div className="col flex justify-content-end my-2">
                <Button label="Iniciar Sessión" />
            </div>
        </header>
    )
}