import navbarCSS from './navbar.module.scss'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className={navbarCSS.nav}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/shop/'>Shop</Link></li>
                <li><Link to='/signin'>Sign In</Link></li>
                <li><Link to='/cart'>Cart</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar