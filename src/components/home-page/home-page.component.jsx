import React from 'react'
import './home-page.component.scss'
import Card from '../cards/card.component'
class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [{ 'id': 1, 'item': 'hat', 'imgSrc': 'https://source.unsplash.com/6NVrH0HB_DE' }, { 'id': 2, 'item': 'shoes', 'imgSrc': 'https://source.unsplash.com/164_6wVEHfI' }, { 'id': 3, 'item': 'glasses', 'imgSrc': 'https://source.unsplash.com/bSjqyqukCjY' }, { 'id': 4, 'item': 'Men', 'imgSrc': 'https://source.unsplash.com/z3otWAqSs-g' }, { 'id': 5, 'item': 'Women', 'imgSrc': 'https://source.unsplash.com/zaeBgN8OTsg' }]
        }
    }

    render() {
        return (
            <div className="card-container">
                {this.state.data.map(element => {
                    return (
                        <Card data={element} key={element.id} />
                    )
                }
                )}
            </div>
        )
    }
}



export default HomePage
