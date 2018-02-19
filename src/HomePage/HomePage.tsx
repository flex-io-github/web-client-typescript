import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { watchCreateLesson } from '../_saga/sagas';

import { userActions } from '../_actions/user.actions';

export interface HomePageProps {
    dispatch: (action: any) => void;
    user: any;
    users: any;
  }

class HomePage extends React.Component<HomePageProps, {}> {
    constructor(props: any){
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll())
        // watchCreateLesson()
    };

    handleDeleteUser(id: any) {
        this.props.dispatch(userActions.delete(id));
    };

    render() {
        const { user, users } = this.props;
            
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React and ASP.NET Core 2.0!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user: any, index: any) =>
                            <li key={user.id}>
                                {user.username + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={e => this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                                <Link to={`/user/${user.id}`}>Edit</Link>
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state: any = {}) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

// const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
// export { connectedHomePage as HomePage };

export default connect(mapStateToProps)(HomePage);