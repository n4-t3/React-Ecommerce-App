import cartCSS from './cart.module.scss'
import { useState } from 'react'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
const CartPage = (props) => {
    const data = JSON.parse(localStorage.getItem('cart'))
    const [cart, setCart] = useState(data)
    const handleDelete = (element) => {
        localStorage.removeItem('cart')
        const newCart = cart.filter(item => item !== element)
        setCart(newCart)
        newCart.length >= 1 ? (localStorage.setItem('cart', JSON.stringify([...newCart]))) : (localStorage.removeItem('cart'))
    }
    let total = 0
    if (cart && cart.length > 0) {
        return (
            <>
                <ul>
                    {cart.map((element, index) => {
                        total+=parseInt(element.price)
                        return (
                            <li key={index} className={cartCSS.row}>
                                <div>{element.name}</div>
                                <div>{element.price}</div>
                                <div className={cartCSS.delete} onClick={() => handleDelete(element)}>Delete</div>
                            </li>)
                    })}
                </ul>
                <div className={cartCSS.total}>
                    Total = ${total}
                </div>

                <StripeCheckoutButton price={total} setCart={setCart}/>
                <div className={cartCSS.paymentInfo}>
                    *Use the following credit card information for payment*<br />
                    Card Number: 4242 4242 4242 4242<br />
                    CVV: 123<br />
                    Expiry: any date in future
                </div>
            </>
        )
    } else {
        return (
            <h1>No items in cart</h1>
        )
    }
}

export default CartPage