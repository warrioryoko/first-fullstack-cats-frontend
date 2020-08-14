import React, { Component } from 'react';
import { fetchCat } from './cat-api.js';

export default class DetailPage extends Component {
    state = {
        cat: {}
    }

    componentDidMount = async () => {
        const data = await fetchCat(this.props.match.params.id)

        this.setState({
            cat: data.body
        })
    }

    render() {
        return (
            <div>
                This is your cute cat! {this.state.cat.name} is a {this.state.cat.breed}, and is {this.state.cat.age} years old!
            </div>
        )
    }
}