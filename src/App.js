import React from 'react';
import { fetchCats } from './cat-api.js';
import './App.css';

class App extends React.Component {
    state = {
        cats: []
    }

    componentDidMount = async () => {
        const data = await fetchCats()

        this.setState({
            cats: data.body
        })
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
                <h2>Cats:</h2>
                {
                    this.state.cats.map((cat) => {
                        return <div>
                            name: {cat.name} | breed: {cat.breed} | age: {cat.age} | fed recently: {`${cat.fed_recently}`}
                        </div>
                    })
                }
            </header>
            </div>
        );
    }
}


export default App;
