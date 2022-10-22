import React from 'react'
import './home-page.component.scss'
import HomeCard from '../../components/home-cards/home-card.component'
import ShoppingPage from '../shopping-page/shopping-page.component'
import data from '../../data/data'
import { BrowserRouter as Router, Switch, Route, withRouter, Link } from 'react-router-dom'

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            data
        }
    }

    render() {
        return (
            <div className="card-container">
                {this.state.data.map(element => {
                    return (
                        <HomeCard data={element} key={element.id} />
                    )
                }
                )}
            </div>

            // < ShoppingPage data={this.state.data[0]} />
        )
    }
}



export default HomePage
