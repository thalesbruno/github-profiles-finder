import React, { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Spinner from './components/layout/Spinner'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import './App.css'
import axios from 'axios'


class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null
    }

    searchUsers = async text => {
        this.setState({ loading: true })
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        this.setState({ users: res.data.items, loading: false })
    }

    clearUsers = () => this.setState({ users: [] })

    setAlert = (msg, type) => {
        this.setState({ alert: { msg: msg, type: type } })

        setTimeout(() => this.setState({ alert: null }), 5000)
    }

    render() {

        return (
            <div className='App'>
                <Navbar />
                <div className="container">
                    <Alert alert={this.state.alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClearButton={this.state.users.length > 0}
                        setAlert={this.setAlert}
                    />
                    {this.state.loading ? <Spinner /> : <Users users={this.state.users} />}
                </div>
            </div>
        );
    }
}

export default App;
