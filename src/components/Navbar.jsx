import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faLineChart } from '@fortawesome/free-solid-svg-icons/faLineChart'
import {
  IconLayoutDashboard,
  IconReceipt,
  IconChartBar,
  IconWallet,
  IconSettings,
  IconPlus
} from "@tabler/icons-react"
import { useExpense } from '../context/ExpenseContext'


const Navbar = () => {
    const { userName } = useExpense()
    const[menuOpen, setMenuOpen] = React.useState(false)

    function handleHamburgerOpen(){
        setMenuOpen((prevState) => !prevState)
    }

    function handleLinkClick(){
        setMenuOpen(false)
    }

  return (
    <header className='navbar'>
        <div className="navbar-container">
            <div className="logo">
                <Link to={"/"}>
                    <FontAwesomeIcon icon={faLineChart} />
                    <span className='logo-text'>Trackr</span>
                </Link>
            </div>

            <div className="nav-links">
                <NavLink to="/" end className={({isActive}) => {
                    return isActive ? "nav-link active" : "nav-link"
                }}>
                    <IconLayoutDashboard />
                    <span>Dashboard</span> 
                </NavLink>

                <NavLink to="/transactions" className={({isActive}) => {
                    return isActive ? "nav-link active" : "nav-link"
                }}>
                    <IconReceipt />
                    <span>Transactions</span>
                </NavLink>

                <NavLink to="/analytics" className={({isActive}) => {
                    return isActive ? "nav-link active" : "nav-link" 
                }}>
                    <IconChartBar />
                    <span>Analytics</span>
                </NavLink>

                <NavLink to="/budgets" className={({isActive}) => {
                    return isActive ? "nav-link active" : "nav-link"
                }}>
                    <IconWallet /> 
                    <span>Budgets</span>
                </NavLink>

                <NavLink to="/settings" className={({isActive}) => {
                    return isActive ? "nav-link active" : "nav-link"
                }} >
                    <IconSettings /> 
                    Settings
                </NavLink>
            </div>
        </div>

        <div className="navbar-right">
            <span className="greeting">Hi, there</span>
            <Link to="/add" className="btn-primary nav-add">
                <IconPlus />
                <span>Add transaction</span>
            </Link>

            <button className='hamburger-btn' onClick={handleHamburgerOpen}>
                <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <h1 className="greeting-mobile">
                Hi, {userName}
            </h1>

            <NavLink to="/" end onClick={handleLinkClick}>
                <IconLayoutDashboard />
                <span>Dashboard</span> 
            </NavLink>

            <NavLink to="/transactions" onClick={handleLinkClick}>
                <IconReceipt />
                <span>Transactions</span>
            </NavLink>

            <NavLink to="/analytics" onClick={handleLinkClick}>
                <IconChartBar />
                <span>Analytics</span>
            </NavLink>

            <NavLink to="/budgets" onClick={handleLinkClick}>
                <IconWallet /> 
                <span>Budgets</span>
            </NavLink>

            <NavLink to="/settings"  onClick={handleLinkClick}>
                <IconSettings /> 
                Settings
            </NavLink>

            <Link to="/add" className="btn-primary mobile-add" onClick={handleLinkClick}>
                <IconPlus />
                <span>Add transaction</span>
            </Link>
        </div>
    </header>
  )
}

export default Navbar