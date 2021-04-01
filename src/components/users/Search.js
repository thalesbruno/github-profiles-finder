import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { GithubContext } from '../../context/GithubContext'


const Search = ({ clearUsers, showClearButton, searchUsers }) => {

    const [text, setText] = useState('')

    const [alert, setAlert] = useContext(GithubContext)

    const onSubmit = e => {
        e.preventDefault()
        if (text === '') {
            showAlert('Please enter something', 'light')
        } else {
            searchUsers(text)
            setText('')
        }
    }

    const showAlert = (message, type) => {
        setAlert({ message: message, type: type })

        setTimeout(() => setAlert(null), 5000)
    }

    const onChange = e => setText(e.target.value)

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="Search users" value={text} onChange={onChange} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            { showClearButton && (<button className="btn btn-block btn-light" onClick={clearUsers}>Clear</button>)}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
}

export default Search
