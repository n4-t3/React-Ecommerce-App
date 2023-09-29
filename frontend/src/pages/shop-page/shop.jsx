import shopCSS from './shop.module.scss'
import { ShoppingContext } from '../../App'
import React, { useContext } from 'react'
import ShopComponent from '../../components/shop-component/shopComponent.component'

const Shop = (props) => {
    const context = useContext(ShoppingContext)
    return (
        context.data.map(choice => {
            return (
                <ShopComponent key={choice.id} data={choice} />
            )
        })
    )
}

export default Shop