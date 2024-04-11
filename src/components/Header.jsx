import { Link } from "react-router-dom"
import image from "../assets/header.jfif"
import { Button } from 'primereact/button'
import { Fragment, useContext, useRef, useState } from "react"
import { LoginModal } from "./LoginModal"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { Menu } from "primereact/menu"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo_ugel_chincheros.png"
import { UserContext } from "../store"

export const Header = () => {
    const navigate = useNavigate()
    const menuRight = useRef(null)
    const { userData } = useContext(UserContext)
    const [visible, setVisible] = useState(false)

    const isAuth = !!localStorage.getItem('AuthToken')

    const items = [
        {
            label: 'Menú Principal',
            items: [
                {
                    label: 'Asistencia',
                    icon: 'pi pi-stopwatch',
                    command: () => navigate('/admin')
                },
                {
                    label: 'Visitantes',
                    icon: 'pi pi-users',
                    command: () => navigate('/admin/visitantes')
                }
            ]
        }
    ]

    const adminItems = [
        ...items,
        {
            label: 'Usuarios',
            icon: 'pi pi-lock',
            command: () => navigate('/admin/usuarios')
        }
    ]

    const handleShowLoginModal = () => {
        setVisible(true)
    }

    const handleLogout = () => {
        confirmDialog({
            message: '¿Desea cerrar sesión?',
            header: 'Confirmación de cierre de sesión',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Aceptar',
            rejectLabel: 'Cancelar',
            accept: () => {
                localStorage.removeItem('AuthToken')
                window.location.reload()
            },
            reject: () => {
                console.log('reject')
            }
        })
    }

    return (
        <Fragment>
            <header className="flex justify-content-between shadow-2 px-2">
                <div className="flex align-items-center gap-2">
                    <Link to="/">
                        <img src={image} alt="header" style={{
                            width: 600,
                            height: 'auto'
                        }} />
                    </Link>
                    <Link to="/">
                        <img src={logo} alt="logo" style={{
                            width: 'auto',
                            height: 64
                        }} />
                    </Link>
                </div>
                <div className="flex align-items-center gap-2">
                    {
                        !isAuth && <Button onClick={handleShowLoginModal} label="Iniciar Sessión" />
                    }
                    {
                        isAuth && (
                            <Fragment>
                                <span>{userData && userData.nombres}</span>
                                <Button severity="danger" onClick={handleLogout} label="Cerrar Sessión" />
                                <Button icon="pi pi-bars"
                                    onClick={(event) => menuRight.current.toggle(event)}
                                    severity="secondary" />
                                <Menu model={userData && userData.rol === 'admin' ? adminItems : items} popup ref={menuRight} popupAlignment="right" className="mt-2" />
                            </Fragment>
                        )
                    }
                </div>
            </header>
            <ConfirmDialog draggable={false} />
            <LoginModal visible={visible}
                setVisible={setVisible} />
        </Fragment>

    )
}