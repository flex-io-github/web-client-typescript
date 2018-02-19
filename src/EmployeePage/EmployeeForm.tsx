import * as React from 'react';
import { connect } from 'react-redux';
import InputForm from '../_helpers/input-form';
import validateInput from '../_validator/EmployeeValidator';
import { employeeActions } from "../_actions";


export interface EmployeeFormProps extends React.Props<any> {
    dispatch: (action: any) => void;
    selectedEmployee: {
        code: string;
        given_name: string;
        other_given_name: string;
        surname: string;
        prefix: string;
        suffix: string;
        data_of_birth: string;
        gender_id: number;
        email_address: string;
        mobile_number: string;
        work_type_id: number;
        employee_status_id: number;
        id?: number;
    };
}

export interface EmployeeFormState {
    employee: {
        code: string;
        given_name: string;
        other_given_name: string;
        surname: string;
        prefix: string;
        suffix: string;
        data_of_birth: string;
        gender_id: number;
        email_address: string;
        mobile_number: string;
        work_type_id: number;
        employee_status_id: number;
        id?: number;
    },
    errors: {
        code: string;
        given_name: string;
        other_given_name: string;
        surname: string;
        prefix: string;
        suffix: string;
        data_of_birth: string;
        gender_id: string;
        email_address: string;
        mobile_number: string;
        work_type_id: string;
        employee_status_id: string;
    },
    isAdd: boolean;
}

class EmployeeForm extends React.Component<EmployeeFormProps, EmployeeFormState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            employee: {
                code:  props.match.params.EmployeeId ? this.props.selectedEmployee.code : '',
                given_name: props.match.params.EmployeeId ? this.props.selectedEmployee.given_name : '',
                other_given_name: props.match.params.EmployeeId ? this.props.selectedEmployee.other_given_name : '',
                surname: props.match.params.EmployeeId ? this.props.selectedEmployee.surname : '',
                prefix: props.match.params.EmployeeId ? this.props.selectedEmployee.prefix : '',
                suffix: props.match.params.EmployeeId ? this.props.selectedEmployee.suffix : '',
                data_of_birth: props.match.params.EmployeeId ? this.props.selectedEmployee.data_of_birth.substring(0, 10) : '',
                gender_id: props.match.params.EmployeeId ? this.props.selectedEmployee.gender_id : 0,
                email_address: props.match.params.EmployeeId ? this.props.selectedEmployee.email_address : '',
                mobile_number: props.match.params.EmployeeId ? this.props.selectedEmployee.mobile_number : '',
                work_type_id: props.match.params.EmployeeId ? this.props.selectedEmployee.work_type_id : 0,
                employee_status_id: props.match.params.EmployeeId ? this.props.selectedEmployee.employee_status_id : 0,
                id: props.match.params.EmployeeId ? this.props.selectedEmployee.id : 0,
            },
            errors: {
                code: '',
                given_name: '',
                other_given_name: '',
                surname: '',
                prefix: '',
                suffix: '',
                data_of_birth: '',
                gender_id: '',
                email_address: '',
                mobile_number: '',
                work_type_id: '',
                employee_status_id: '',
            },
            isAdd: props.match.params.EmployeeId ? false : true
        };
    }

    isValid(){
        const {errors, isValid} = validateInput(this.state.employee);
        if (!isValid) {
            this.setState({ errors });
    }

        return isValid;
    }

    handleSubmit(e: any) {
        e.preventDefault();

        const { employee } = this.state;
        const { dispatch } = this.props;
        if (this.isValid()) {
            if (this.state.isAdd) {
                dispatch(employeeActions.add(employee));
            } else {
                dispatch(employeeActions.update(employee));
            }
        }
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        const { employee, errors } = this.state;
        this.setState({
            employee: {
                ...employee,
                [name]: value
            },
            errors: {
                ...errors,
                [name]: ''
            }
        });
    }

    render() {
        const { employee, errors } = this.state;
        return (
            <div>
                <h2>New Employee</h2>
                <form name="form" onSubmit={(e => this.handleSubmit(e))}>
                    <InputForm
                        error={errors.code}
                        label="Code"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.code}
                        field="code"
                        type="text"
                    />

                    <InputForm
                        error={errors.given_name}
                        label="First Name"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.given_name}
                        field="given_name"
                        type="text"
                    />

                    <InputForm
                        error={errors.other_given_name}
                        label="Second Name"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.other_given_name}
                        field="other_given_name"
                        type="text"
                    />

                    <InputForm
                        error={errors.surname}
                        label="Last Name"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.surname}
                        field="surname"
                        type="text"
                    />

                    <InputForm
                        error={errors.prefix}
                        label="Prefix"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.prefix}
                        field="prefix"
                        type="text"
                    />

                    <InputForm
                        error={errors.suffix}
                        label="Suffix"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.suffix}
                        field="suffix"
                        type="text"
                    />

                    <InputForm
                        error={errors.data_of_birth}
                        label="Date of Birth"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.data_of_birth}
                        field="data_of_birth"
                        type="date"
                    />

                    <InputForm
                        error={errors.email_address}
                        label="Email Address"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.email_address}
                        field="email_address"
                        type="email"
                    />

                    <InputForm
                        error={errors.mobile_number}
                        label="Mobile Number"
                        onChange={((e: any) => this.handleChange(e))}
                        value={employee.mobile_number}
                        field="mobile_number"
                        type="text"
                    />

                    <div>
                        <br/>
                        <button className="btn btn-primary btn-lg">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state: any, props: any) {
    if (props.match.params.EmployeeId) {
        const selectedEmployee = state.employees.items.filter((c: any) => c.id.toString() == props.match.params.EmployeeId);
        return {
            selectedEmployee: selectedEmployee[0],
        };
    } else {
        const selectedEmployee = {}
        return {
            selectedEmployee
        };
    }
}


export default connect(mapStateToProps)(EmployeeForm);