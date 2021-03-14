import UserItem from './UserItem'
import PropTypes from 'prop-types'


const Users = ({ users }) => {
    return (
        <div className="grid-3">
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    )

}

Users.propTypes = {
    users: PropTypes.array.isRequired,
}

export default Users
