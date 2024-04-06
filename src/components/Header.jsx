import { Link } from "react-router-dom"
import image from "../assets/header.jfif"
import { Button } from 'primereact/button'
import { Fragment, useEffect, useRef, useState } from "react"
import { LoginModal } from "./LoginModal"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { Menu } from "primereact/menu"

export const Header = () => {
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
                    icon: 'pi pi-stopwatch'
                },
                {
                    label: 'Visitantes',
                    icon: 'pi pi-users',
                },
                {
                    label: 'Oficinas',
                    icon: 'pi pi-sitemap'
                },
                {
                    label: 'Funcionarios',
                    icon: 'pi pi-users'
                },
                {
                    label: 'Config. Accesos',
                    icon: 'pi pi-lock'
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
            <header className="grid container">
                <div className="col">
                    <Link to="/">
                        <img src={image} alt="header" style={{
                            width: 600,
                            height: 'auto'
                        }} />
                    </Link>
                </div>
                <div className="col flex justify-content-end gap-2 my-2">
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