import cartCSS from './cart.module.scss'
import { useState } from 'react'
import Button from '../../components/button/button.component'
const CartPage = (props) => {
    const data = JSON.parse(localStorage.getItem('cart'))
    const [cart, setCart] = useState(data)
    const handleDelete = (element) => {
        localStorage.removeItem('cart')
        const newCart = cart.filter(item=>item!==element)
        setCart(newCart)
        newCart.length>=1 ? (localStorage.setItem('cart',JSON.stringify([...newCart]))) : (localStorage.removeItem('cart'))
    }
    const handleCheckOut = ()=>{
        console.log('checkout')
    }
    if (cart) {
        return (
            <>
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
            <Button onClick={handleCheckOut} className={cartCSS.btn} color = "secondary" value="Check Out" />
            </>
        )
    } else {
        return (
            <h1>No items in cart</h1>
        )
    }
}

export default CartPage