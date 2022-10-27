import shopComponentCSS from './shopComponent.module.scss'
import ShoppingCard from '../shop-card/shop-card.component'

const ShopComponent = (props) => {
    const data = props.data
    return (
        <div >
            <h1 className="page-header">{data.item.toUpperCase()}</h1>
            <div className="card-container">
                {data.closet.map(element => {
                    return (
                        <ShoppingCard key={element.id} data={element} />
                    )
                }
                )}
            </div>
        </div >
    )
}

export default ShopComponent
