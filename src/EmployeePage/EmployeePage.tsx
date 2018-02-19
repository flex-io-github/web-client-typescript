import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { employeeActions } from '../_actions';

//style

export interface EmployeePageProps {
    dispatch: (action: any) => void;
    employees: any;
}

class EmployeePage extends React.Component<EmployeePageProps, {}> {
    constructor(props: any){
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(employeeActions.getAll())
    };

    
    handleDeleteUser(id: any) {
        this.props.dispatch(employeeActions.delete(id));
    };

    render() {
        const { employees } = this.props;
        return (
            <div>
                <h2>Employees</h2>

                <Link to={`/employee/new`}>Add</Link>

                {employees.loading && <em>Loading users...</em>}
                {employees.items &&
                    <ul>
                        {employees.items.map((employee: any, index: any) =>
                            <li key={employee.id}>
                                {employee.code + ' ' + employee.given_name}
                                {
                                    employee.deleting ? <em> - Deleting...</em>
                                    : employee.deleteError ? <span className="text-danger"> - ERROR: {employee.deleteError}</span>
                                    : <span> - <a onClick={e => this.handleDeleteUser(employee.id)}>Delete</a></span>
                                }
                                <Link to={`/employee/edit/${employee.id}`}>Edit</Link>
                            </li>
                        )}
                    </ul>
                }
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">A</div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">B</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any = {}) {
    const { employees } = state;
    return {
        employees
    };
}

export default connect(mapStateToProps)(EmployeePage);