import React, { createContext, useState } from 'react'
// import axios from 'axios'

export const GithubContext = createContext()

export const GithubProvider = (props) => {

    const [alert, setAlert] = useState(null)

    return (
        <GithubContext.Provider value={[alert, setAlert]}>
            {props.children}
        </GithubContext.Provider>
    )
}