import React from 'react';
import './home-card.component.scss'
const HomeCard = (props) => {
    return (
        <div className="card-wrapper">
            <div className="card" style={{ backgroundImage: `url(${props.data.imgSrc})` }}>
                <div className="card-explanation">
                    <h1 className="card-title">{props.data.item.toUpperCase()}</h1>
                    <p className="advertisement">SHOP NOW</p>
                </div>
            </div>
        </div>
    )
}

export default HomeCard