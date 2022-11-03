import React, {useContext,} from 'react'
import shoppingCardCSS from './shop-card.module.scss'
import { ShoppingContext } from '../../App'
import { addCartElementToCloud,getUserProfile } from '../../firebase/firebase.utils'

const ShoppingCard = (props) => {
    const ctx = useContext(ShoppingContext)
    const user = ctx.user
    const handleAddingToCart = async (e,props)=>{
        if (user){
            addCartElementToCloud(user.uid,[props.data])
            await getUserProfile(user.uid).then(
                resp=>ctx.setUser(resp)
            )
        }else{
            if (localStorage.getItem('cart')){
                const cart = JSON.parse(localStorage.getItem('cart'))
                localStorage.setItem('cart',JSON.stringify([...cart,props.data]))
            }else{
                localStorage.setItem('cart',JSON.stringify([props.data]))
            }
        }
    }
    return (
        <div className={shoppingCardCSS.center}>
        <div className={shoppingCardCSS.wrapper}>
            <img className={shoppingCardCSS.img} src={props.data.imgSrc} alt={props.data.name} loading="lazy"/>
            <div onClick={(e)=>handleAddingToCart(e,props)} className={shoppingCardCSS.overCard}>
                <p>ADD TO CART</p>
            </div>
            <div className={shoppingCardCSS.text}>
                <p>{props.data.name}</p>
                <p>${props.data.price}</p>
            </div>
        </div>
        </div>
    )
}

export default ShoppingCard