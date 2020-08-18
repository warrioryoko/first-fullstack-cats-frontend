/* eslint-disable */
import React, { Component } from 'react';
import { fetchCats } from './cat-api.js';
import { Link } from 'react-router-dom';

export default class ListPage extends Component {
    state = {
        cats: []
    }

    componentDidMount = async () => {
        const data = await fetchCats()

        this.setState({
            cats: data.body
        })

        console.log('=============================\n')
        console.log('|| data.body', data.body)
        console.log('\n=============================')
    }

    render() {
        return (
            <div className="cats">
                {
                    this.state.cats.map((cat) => {
                    return <Link className="cat" to={`/detail/${cat.id}`} key={`${cat.id}-${cat.name}`}>
                        <p>Name: {cat.name}</p>
                        <p>Breed: {cat.breed}</p>
                        <p>Age: {cat.age}</p>
                        <p>Favorite Toy: {cat.favorite_toy}</p>
                    </Link>
                    })
                }
            </div>
        )
    }
}