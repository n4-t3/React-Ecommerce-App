import React from 'react';
import './shopping-page.component.scss'

const ShoppingPage = (props)=>{
    console.log(props)
    return (
        <div>
            <h1 class="page-header">{props.data.item}</h1>
            <div className="card-container">
                
            </div>
        </div>
    )
}

export default ShoppingPage