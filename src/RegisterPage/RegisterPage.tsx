import * as React from 'react';
import { connect } from 'react-redux';
import { userActions, employeeActions } from "../_actions";
import { lookupService } from '../_services';
import InputForm from '../_helpers/input-form';
import validateInput from '../_validator/RegisterValidator';

export interface RegisterPageProps extends React.Props<any> {
    dispatch: (action: any) => void;
    registering: any;
    selecteduser: {
        username?: string;
        password?: string;
        id?: number;
        auth_user_role_id?: string;
        employee_id?: string;
    };
    users: any;
    authentication: any;
    employees: any;
}

export interface RegisterPageState {
    user: {
        id?: number;
        username?: string;
        password?: string;
        confirmPassword?: string;
        auth_user_role_id?: string;
        employee_id?: string;
    };
    submitted: boolean;
    age: string;
    categories: any;
    errors: {
        username: string;
        password: string;
        confirmPassword: string;
        auth_user_role_id: string;
        employee_id: string;
    },
    isRegister: boolean,
    isShowPassword: boolean
}

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
    constructor(props: any) {
        super(props);

        // reset login status
        if (!props.match.params){
            this.props.dispatch(userActions.logout());
        }
        
        this.state = {
            user: {
                username: props.match.params.UserId ? this.props.selecteduser.username : '',
                password: props.match.params.UserId ? this.props.selecteduser.password : '',
                confirmPassword: '',
                id: props.match.params.UserId ? this.props.selecteduser.id : 0,
                auth_user_role_id: props.match.params.UserId ? this.props.selecteduser.auth_user_role_id : '',
                employee_id: props.match.params.UserId ? this.props.selecteduser.employee_id : ''
            },
            submitted: false,
            age: '',
            categories: [{
                lookup_id: '',
                lookup_name: ''
            }],
            errors: {
                username: '',
                password: '',
                confirmPassword: '',
                auth_user_role_id: '',
                employee_id: ''
            },
            isRegister: props.match.params.UserId ? false : true,
            isShowPassword: false
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
        if (this.props.authentication.loggedIn) {
            this.props.dispatch(employeeActions.getAll())
        }
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        const { user, errors } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
            errors: {
                ...errors,
                [name]: ""
            }
        });
    }

    isValid(){
        const {errors, isValid} = validateInput(this.state.user);
        if (!isValid) {
            this.setState({ errors });
    }

        return isValid;
    }

    handleSubmit(e: any) {
        e.preventDefault();

        this.setState({submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (this.isValid()) {
            if (this.state.isRegister) {
                dispatch(userActions.register(user));
            } else {
                dispatch(userActions.update(user));
            }
        }
    }

    ShowPassword(e: any) {
        this.setState({isShowPassword: true})
    }

    HidePassword(e: any) {
        this.setState({isShowPassword: false})
    }

    render(){
        const { registering, employees } = this.props;
        const { user, categories, errors, isRegister, isShowPassword } = this.state;
        return(
            <div>
                {isRegister ? <h2>Register</h2> : <h2>Update Record</h2>}
                <form name="form" onSubmit={(e => this.handleSubmit(e))}>
                    
                    <InputForm
                        error={errors.username}
                        label="Username"
                        onChange={((e: any) => this.handleChange(e))}
                        value={user.username}
                        field="username"
                        type="text"
                    />

                    <InputForm
                        error={errors.password}
                        label="Password"
                        onChange={((e: any) => this.handleChange(e))}
                        value={user.password}
                        field="password"
                        type={isShowPassword ? "text" : "password"}
                    />

                    <p onMouseDown={(e => this.ShowPassword(e))} onMouseUp={(e => this.HidePassword(e))}>Show Password</p>

                    <InputForm
                        error={errors.confirmPassword}
                        label="Confirm Password"
                        onChange={((e: any) => this.handleChange(e))}
                        value={user.confirmPassword}
                        field="confirmPassword"
                        type="password"
                    />

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
                        {errors.auth_user_role_id && <span className="text-danger">{errors.auth_user_role_id}</span>}
                    </div>

                    <div className="form-group">
                        <label className="control-label">Employee</label>
                        <select
                            name="employee_id"
                            value={user.employee_id}
                            onChange={(e => this.handleChange(e))}
                        >
                        {employees.items ? 
                            employees.items.map(function(employee: any, index: any){
                            return <option key={index} value={employee.id}>{employee.code + ': ' + employee.given_name + ' ' + employee.surname}</option>}) : 
                            <option key='' value=''/>
                        }

                        </select>
                        {errors.employee_id && <span className="text-danger">{errors.employee_id}</span>}
                    </div>

                    <div>
                        <br/>
                        <button className="btn btn-primary btn-lg">
                            {isRegister ? "Register" : "Update"}
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

function mapStateToProps(state: any, props: any) {
    const { employees, authentication, users } = state;
    if (props.match.params.UserId) {
        const selecteduser = state.users.items.filter((c: any) => c.id.toString() == props.match.params.UserId);
        return {
            selecteduser: selecteduser[0],
            employees,
            authentication,
            users
        };
    } else {
        const { registering } = state.registration;
        const selecteduser = {}
        return {
            registering,
            selecteduser,
            employees,
            authentication,
            users
        };
    }
}


export default connect(mapStateToProps)(RegisterPage);