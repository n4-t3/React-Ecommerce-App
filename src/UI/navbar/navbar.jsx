import navbarCSS from './navbar.module.scss'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { ShoppingContext } from '../../App'
import { useContext } from 'react'
import { signInWithGoogle,signOutWithGoogle } from '../../firebase/firebase.utils'

const Navbar = () => {
    const ctx = useContext(ShoppingContext)
    const user = ctx.user
    return (
        <nav className={navbarCSS.nav}>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/shop/'>Shop</Link></li>
                <li><Link to='/cart/'>Cart</Link></li>
                {!user ? <li onClick={signInWithGoogle}>Sign In</li> : null}
                {user ? <li onClick={signOutWithGoogle}>SignOut</li> : null}
            </ul>
        </nav>
    )
}

export default Navbar