import React, { useState, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Spinner from './components/layout/Spinner'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import './App.css'
import axios from 'axios'

import { GithubProvider } from './context/GithubContext'

const App = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)


    const searchUsers = async text => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        setUsers(res.data.items)
        setLoading(false)
    }

    const getUser = async username => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        setUser(res.data)
        setLoading(false)
    }

    const getUserRepos = async username => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=8&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        setRepos(res.data)
        setLoading(false)
    }

    const clearUsers = () => setUsers([])

    return (
        <GithubProvider>
            <Router>
                <div className='App'>
                    <Navbar />
                    <div className="container">
                        <Alert />
                        <Switch>
                            <Route exact path='/' render={props => (
                                <Fragment>
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClearButton={users.length > 0}
                                    />
                                    {loading ? <Spinner /> : <Users users={users} />}
                                </Fragment>
                            )} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' render={props => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    repos={repos}
                                    loading={loading} />
                            )} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubProvider>
    );
}

export default App;
