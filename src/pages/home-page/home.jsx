import './home-page.component.scss'
import HomeCard from '../../components/home-cards/home-card.component'
import { ShoppingContext } from '../../App'
import React, { useContext } from 'react'

const HomePage = (props) => {
    const {data} = useContext(ShoppingContext)

    return (
        <div className="card-container">
            {data.map(element => {
                return (
                    <HomeCard data={element} key={element.id} />
                )
            }
            )}
        </div>
    )
}

export default HomePage
