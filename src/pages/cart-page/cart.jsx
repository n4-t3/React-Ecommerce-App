import cartCSS from './cart.module.scss'
import { useState } from 'react'
const CartPage = (props) => {
    const data = JSON.parse(localStorage.getItem('cart'))
    const [cart, setCart] = useState(data)
    const handleDelete = (element) => {
        localStorage.removeItem('cart')
        const newCart = cart.filter(item=>item!==element)
        setCart(newCart)
        newCart.length>=1 ? (localStorage.setItem('cart',JSON.stringify([...newCart]))) : (localStorage.removeItem('cart'))
    }
    if (cart) {
        return (
            <ul>
                {cart.map((element, index) => {
                    return (
                        <li key={index} className={cartCSS.row}>
                            <div>{element.name}</div>
                            <div>{element.price}</div>
                            <div className={cartCSS.delete} onClick={() => handleDelete(element)}>Delete</div>
                        </li>)
                })}
            </ul>
        )
    } else {
        return (
            <h1>No items in cart</h1>
        )
    }
}

export default CartPage