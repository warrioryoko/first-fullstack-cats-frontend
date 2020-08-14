import React, { Component } from 'react';
import { createCat } from './cat-api.js';
import './App.css';

export default class CreatePage extends Component {
    state = {
        name: 'morgan',
        breed: 'munchkin',
        age: '3',
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await createCat({
            name: this.state.name,
            breed: this.state.breed,
            age: this.state.name
        });

        this.setState({
            name: '',
            breed: '',
            age: 1,
        })
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    }

    handleBreedChange = e => {
        this.setState({ breed: e.target.value });
    }

    handleAgeChange = e => {
        this.setState({ age: e.target.value });
    }

    render() {
        return (
            <div className="content">
                <h2>Adopt a Cat</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input onChange={this.handleNameChange} type="text" value={this.state.name} />
                    </label>
                    <label>
                        Breed: 
                        <input onChange={this.handleBreedChange} type="text" value={this.state.breed} />
                    </label>
                    <label>
                        Age: 
                        <input onChange={this.handleAgeChange} type="number" value={this.state.age} />
                    </label>
                    <button>Adopt Cat</button>
                </form>
            </div>
        )
    }
}