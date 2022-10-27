import React from 'react'
import shoppingCardCSS from './shop-card.module.scss'

const ShoppingCard = (props) => {
    return (
        <div className={shoppingCardCSS.center}>
        <div className={shoppingCardCSS.wrapper}>
            <img className={shoppingCardCSS.img} src={props.data.imgSrc} alt={props.data.name} loading="lazy"/>
            <div className={shoppingCardCSS.overCard}>
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