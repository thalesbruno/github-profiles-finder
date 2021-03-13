import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Spinner from './components/layout/Spinner'
import './App.css'
import axios from 'axios'

class App extends Component {
    state = {
        users: [],
        loading: false
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const res = await axios.get('https://api.github.com/users')
        this.setState({ users: res.data, loading: false })
    }

    render() {

        return (
            <div className='App'>
                <Navbar />
                <div className="container">
                    {this.state.loading ? <Spinner /> : <Users users={this.state.users} />}
                </div>
            </div>
        );
    }
}

export default App;
