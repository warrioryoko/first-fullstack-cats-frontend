import React, { Component } from 'react';
import { createCat, fetchToys } from './cat-api.js';
import './App.css';

export default class CreatePage extends Component {
    state = {
        cat: {},
        name: '',
        breed: '',
        age: 1,
        fed_recently: true,
        toy_id: 1,
        toys: [],
    }

    componentDidMount = async () => {
        const toysData = await fetchToys();

        this.setState({
            toys: toysData.body,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCat({
                name: this.state.name,
                breed: this.state.breed,
                age: this.state.age,
                fed_recently: this.state.fed_recently,
                toy_id: this.state.toy_id,
            });
    
            this.setState({
                name: '',
                breed: '',
                age: 1,
                fed_recently: true,
                toy_id: 1,
            });
        } catch(e) {
            console.log(e.message)
        }

    }

    str2bool = (value) => {
        if (value && typeof value === 'string') {
            if (value.toLowerCase() === "yes") return true;
            if (value.toLowerCase() === "no") return false;
        }
        return value;
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

    handleFedChange = e => {
        
        this.setState({ fed_recently: this.str2bool(e.target.value) })

        console.log(e.target.value);
    }

    handleToyChange = e => {
        this.setState({ toy_id: e.target.value });
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
                    <label>
                        Fed Recently?:
                        <select onChange={this.handleFedChange} value={this.state.fed_recently}>
                            <option>
                                yes
                            </option>
                            <option>
                                no
                            </option>
                        </select>
                    </label>
                    <label>
                        Favorite Toy:
                        <select onChange={this.handleToyChange} value={this.state.favorite_toy}>
                            {
                                this.state.toys.map((toy) => <option value={toy.id}>{toy.favorite_toy}</option>)
                            }
                        </select>
                    </label>
                    <button>Adopt Cat</button>
                </form>
            </div>
        )
    }
}