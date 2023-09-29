import React from 'react';
import './chosen-shopping.component.scss'
import { useLocation } from 'react-router-dom';
import ShopComponent from '../../components/shop-component/shopComponent.component';
const ChosenShoppingPage = (props) => {
    const location = useLocation()
    const data = location.state.data
    return (
        <ShopComponent data={data}/>
    )
}

export default ChosenShoppingPage