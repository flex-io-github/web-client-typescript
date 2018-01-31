import * as React from 'react';
import { connect } from 'react-redux';
import { userActions } from "../_actions";
import { lookupService } from '../_services';

export interface RegisterPageProps extends React.Props<any> {
    dispatch: (action: any) => void;
    registering: any;
}

export interface RegisterPageState {
    user: {
        username?: string;
        password?: string;
        auth_user_role_id?: string;
    };
    submitted: boolean;
    age: string;
    categories: any;
}

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
    constructor(props: any) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            user: {
                username: '',
                password: '',
                auth_user_role_id: '',
            },
            submitted: false,
            age: '',
            categories: [{
                lookup_id: '',
                lookup_name: ''
            }]
        };
    }

    componentDidMount(){
        lookupService.authUserRoles().then((data) => {
            this.setState(
                {
                    categories: data
                }
            );
        })
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.setState({submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render(){
        const { registering  } = this.props;
        const { user, submitted, categories } = this.state;
        return(
            <div>
                <h2>Register</h2>
                <form name="form" onSubmit={(e => this.handleSubmit(e))}>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            value={user.username}
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={(e => this.handleChange(e))}
                        />
                        {submitted && !user.username && <span id="name-error-text">Username is required</span>}
                    </div>

                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input
                            value={user.password}
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={(e => this.handleChange(e))}
                        />
                        {submitted && !user.password && <span id="name-error-text">Password is required</span>}
                    </div>

                    <div className="form-group">
                        <label className="control-label">Role</label>
                        <select
                            name="auth_user_role_id"
                            value={user.auth_user_role_id}
                            onChange={(e => this.handleChange(e))}
                        >
                        <option key='' value=""/>
                        {
                            categories.map(function(category: any, index: any){
                                return <option key={index} value={category.lookup_id}>{category.lookup_name}</option>
                            })
                        }

                        </select>
                    </div>

                    <div>
                        <br/>
                        <button className="btn btn-primary btn-lg">
                            Register
                        </button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const { registering } = state.registration;
    return {
        registering
    };
}


export default connect(mapStateToProps)(RegisterPage);