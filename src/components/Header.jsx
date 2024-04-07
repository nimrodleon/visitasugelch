import { Link } from "react-router-dom"
import image from "../assets/header.jfif"
import { Button } from 'primereact/button'
import { Fragment, useEffect, useRef, useState } from "react"
import { LoginModal } from "./LoginModal"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { Menu } from "primereact/menu"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()
    const menuRight = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        console.log('Header rendered')
    }, [])

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
                },
                {
                    label: 'Lugares',
                    icon: 'pi pi-sitemap'
                },
                {
                    label: 'Funcionarios',
                    icon: 'pi pi-users'
                },
                {
                    label: 'Config. Accesos',
                    icon: 'pi pi-lock',
                    command: () => navigate('/admin/usuarios')
                }
            ]
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
            <header className="flex justify-content-between align-items-center shadow-2 px-2">
            <Link to="/">
                        <img src={image} alt="header" style={{
                            width: 600,
                            height: 'auto'
                        }} />
                    </Link>
                <div className="flex gap-2">
                    {
                        !isAuth && <Button onClick={handleShowLoginModal} label="Iniciar Sessión" />
                    }
                    {
                        isAuth && (
                            <Fragment>
                                <Button severity="danger" onClick={handleLogout} label="Cerrar Sessión" />
                                <Button icon="pi pi-bars"
                                    onClick={(event) => menuRight.current.toggle(event)}
                                    severity="secondary" />
                                <Menu model={items} popup ref={menuRight} popupAlignment="right" className="mt-2" />
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