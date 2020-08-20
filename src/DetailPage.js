import React, { Component } from 'react';
import { fetchCat, deleteCat, updateCat, fetchToys } from './cat-api.js';

export default class DetailPage extends Component {
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
        const data = await fetchCat(this.props.match.params.id)
        const toysData = await fetchToys();

        const matchingToy = toysData.body.find(toy => toy.favorite_toy === data.body.favorite_toy);

        this.setState({
            toys: toysData.body,
            cat: data.body,
            name: data.body.name,
            breed: data.body.breed,
            age: data.body.age,
            fed_recently: data.body.fed_recently,
            favorite_toy: matchingToy.id
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateCat(
                this.props.match.params.id,
                {
                    name: this.state.name,
                    breed: this.state.breed,
                    age: this.state.age,
                    fed_recently: this.state.fed_recently,
                    toy_id: this.state.toy_id,
                }
            );

            const updatedCat = await fetchCat(this.props.match.params.id)

            this.setState({
                name: this.state.name,
                breed: this.state.breed,
                age: this.state.age,
                fed_recently: true,
                toy_id: 1,
                cat: updatedCat.body,
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

    handleDelete = async () => {
        await deleteCat(this.props.match.params.id);

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                This is your cute cat! {this.state.cat.name} is a {this.state.cat.breed}, and is {this.state.cat.age} years old! Their favorite toy is a {this.state.cat.favorite_toy}.

                {this.state.cat.fed_recently ? (
                    <p>{this.state.cat.name} has been fed recently!</p>
                ) : (
                    <p>Uh oh! {this.state.cat.name} has not been fed!</p>
                )}

            <h3>Update the info of this cat?</h3>
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
                    <button>Update Cat</button>
                </form>
                <button style={{ background: 'red' }} onClick={this.handleDelete}>Delete</button>
            </div>
        );
    }
}