import * as React from "react";
import { connect } from "react-redux";
import { userActions } from '../_actions';
import validateInput from '../_validator/UserEditPage';

export interface UserEditPageProps extends React.Props<any> {
    dispatch: (action: any) => void;
    selecteduser: {
        firstName?: string;
        lastName?: string;
        username?: string;
        password?: string;
        id?: number;
    }
}

export interface UserEditPageState {
    user: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        confirmPassword: string;
        id: number;
    };
    errors: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        confirmPassword: string;
    }
}

class UserEditPage extends React.Component<UserEditPageProps, UserEditPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            user: {
                firstName: this.props.selecteduser.firstName ? this.props.selecteduser.firstName : "",
                lastName: this.props.selecteduser.lastName ? this.props.selecteduser.lastName : "",
                username: this.props.selecteduser.username ? this.props.selecteduser.username : "",
                password: this.props.selecteduser.password ? this.props.selecteduser.password : "",
                confirmPassword: "",
                id: this.props.selecteduser.id ? this.props.selecteduser.id : 0,
            },
            errors: {
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                confirmPassword: ""
            }
        }
    }

    isValid(){
        const {errors, isValid} = validateInput(this.state.user);
        if (!isValid) {
            this.setState({ errors });
    }

        return isValid;
    }

    handleSubmit(e: any){
        e.preventDefault();
        const { user } = this.state;
        const { dispatch } = this.props;
        if (this.isValid()) {
            if (user.username && user.password) {
                dispatch(userActions.update(user));
            }
        }
        
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

    render() {
        const { errors, user } = this.state;
        return (
            <div>
                <h1>Edit User</h1>

                <form onSubmit={(e => this.handleSubmit(e))}>
                    <div className={errors.firstName ? "form-group has-error" : "form-group"}>
                        <label className="control-label">First Name</label>
                        <input
                            value={user.firstName}
                            name="firstName"
                            className="form-control"
                            onChange={(e => this.handleChange(e))}
                        />
                        {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                    </div>
                    <div className={errors.lastName ? "form-group has-error" : "form-group"}>
                        <label className="control-label">Last Name</label>
                        <input
                            value={user.lastName}
                            name="lastName"
                            className="form-control"
                            onChange={(e => this.handleChange(e))}
                        />
                        {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                    </div>
                    <div className={errors.username ? "form-group has-error" : "form-group"}>
                        <label className="control-label">Username</label>
                        <input
                            value={user.username}
                            name="username"
                            className="form-control"
                            onChange={(e => this.handleChange(e))}
                        />
                        {errors.username && <span className="text-danger">{errors.username}</span>}
                    </div>
                    <div className={errors.password ? "form-group has-error" : "form-group"}>
                        <label className="control-label">Password</label>
                        <input
                            value={user.password}
                            name="password"
                            className="form-control"
                            type="password"
                            onChange={(e => this.handleChange(e))}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div className={errors.confirmPassword ? "form-group has-error" : "form-group"}>
                        <label className="control-label">Confirm Password</label>
                        <input
                            value={user.confirmPassword}
                            name="confirmPassword"
                            className="form-control"
                            type="password"
                            onChange={(e => this.handleChange(e))}
                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state: any, props: any) {
    const { users } = state;

    if (props.match.params.UserId) {
        const selecteduser = state.users.items.filter((c: any) => c.id.toString() == props.match.params.UserId);
        return {
            selecteduser: selecteduser[0],
            users
        };
    } else return {users}
}

export default connect(mapStateToProps)(UserEditPage);
