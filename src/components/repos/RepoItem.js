import React from 'react'
import PropTypes from 'prop-types'

const RepoItem = ({ repo }) => {

    const { name, html_url, stargazers_count, forks_count } = repo

    return (
        <div className="card text-center">
            <a href={html_url} target="_blank" rel="noreferrer" >{name}</a>
            <p>
                <i className="fas fa-star" />{stargazers_count} <i className="fas fa-code-branch" />{forks_count}
            </p>
        </div>
    )
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
}

export default RepoItem
