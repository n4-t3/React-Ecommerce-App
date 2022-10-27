import React from 'react';
import './shopping-page.component.scss'
import { useLocation } from 'react-router-dom';
import ShoppingCard from '../../components/shop-card/shop-card.component';
const ShoppingPage = (props)=>{
    const location = useLocation()
    const data = location.state.data

    return (
        <div>
            <h1 className="page-header">{data.item.toUpperCase()}</h1>
            <div className="card-container">
                {data.closet.map(element=>{
                    return(
                        <ShoppingCard key={element.id} data={element}/>
                    )}

                )}
            </div>
        </div>
    )
}

export default ShoppingPage