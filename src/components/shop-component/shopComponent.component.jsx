import shopComponentCSS from './shopComponent.module.scss'
import ShoppingCard from '../shop-card/shop-card.component'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import React from 'react'
const ShopComponent = (props) => {
    const data = props.data
    return (
        <React.Fragment >
            <h1 className={shopComponentCSS.header}>{data.item.toUpperCase()}</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 820: 2, 1225: 3}}
            >
                <Masonry>
                    {data.closet.map(element => {
                        return (
                            <ShoppingCard key={element.id} data={element} />
                        )
                    }
                    )}
                </Masonry>
                </ResponsiveMasonry>
        </React.Fragment >
    )
}

export default ShopComponent
