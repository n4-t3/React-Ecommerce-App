import React from 'react';
import './shopping-page.component.scss'
import { useLocation } from 'react-router-dom';
import ShopComponent from '../../components/shop-component/shopComponent.component';
import ShoppingCard from '../../components/shop-card/shop-card.component';
const ShoppingPage = (props) => {
    const location = useLocation()
    const data = location.state.data
    return (
        <ShopComponent data={data}/>
    )
}

export default ShoppingPage