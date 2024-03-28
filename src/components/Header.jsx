import { Link } from "react-router-dom"
import image from "../assets/header.jfif"
import { Button } from 'primereact/button'
import { Fragment, useState } from "react"
import { LoginModal } from "./LoginModal"

export const Header = () => {
    const [visible, setVisible] = useState(false)

    const handleShowLoginModal = () => {
        setVisible(true)
    }

    return (
        <Fragment>
            <header className="grid container">
                <div className="col">
                    <Link to="/">
                        <img src={image} alt="header" style={{
                            width: 600,
                            height: 'auto'
                        }} />
                    </Link>
                </div>
                <div className="col flex justify-content-end my-2">
                    <Button onClick={handleShowLoginModal} label="Iniciar Sessión" />
                </div>
            </header>
            <LoginModal visible={visible}
                setVisible={setVisible} />
        </Fragment>

    )
}