import * as React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from "../_actions";

export interface LoginPageProps extends React.Props<any> {
    dispatch: (action: any) => void;
    username?: string;
    password?: string;
}

export interface LoginPageState {
    username?: string;
    password?: string;
    showPassword: boolean;
    submitted: boolean;
    name: string;
    value: string;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: any) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: "admin",
            password: "masterkey",
            showPassword: false,
            submitted: false,
            name: "",
            value: ""
        };
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        this.setState({...this.state, [name]: value });
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    render(){
        const { username, password, submitted } = this.state;
        return(
            <form onSubmit={(e => this.handleSubmit(e))}>
                <h2>Login</h2>
    
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        value={this.props.username}
                        type="text"
                        name="username"
                        className="form-control"
                        defaultValue="admin"
                        onChange={(e => this.handleChange(e))}
                    />
                    {submitted && !username && (
                        <div className="help-block">
                            Username is required
                        </div>
                    )}
                </div>
    
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.props.password}
                        type="password"
                        name="password"
                        className="form-control"
                        defaultValue="masterkey"
                        onChange={(e => this.handleChange(e))}
                    />
                    {submitted && !password && (
                        <div className="help-block">
                            Password is required
                        </div>
                    )}
                </div>
    
                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
                        Login
                    </button>
                    <Link to="/register" className="btn btn-link">
                        Register
                    </Link>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state: any) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}


export default connect(mapStateToProps)(LoginPage);