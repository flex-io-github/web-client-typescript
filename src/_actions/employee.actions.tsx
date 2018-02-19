import { employeeConstants } from '../_constants';
import { employeeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const employeeActions = {
    add,
    getAll,
    delete: _delete,
    update
};

function add(employee: any) {
    return (dispatch: any) => {
        dispatch(request(employee));

        employeeService.add(employee)
            .then(
                () => { 
                    dispatch(success(employee));
                    history.push('/employees');
                    dispatch(alertActions.success('New Employee added successful'));
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(employee: any) { return { type: employeeConstants.ADD_REQUEST, employee }; }
    function success(employee: any) { return { type: employeeConstants.ADD_SUCCESS, employee }; }
    function failure(error: any) { return { type: employeeConstants.ADD_FAILURE, error }; }
}

function getAll() {
    return (dispatch: any) => {
        dispatch(request());

        employeeService.getAll()
            .then(
                (employees: any) => dispatch(success(employees)),
                (error: any) => dispatch(failure(error))
            );
    };

    function request() { return { type: employeeConstants.GETALL_REQUEST }; }
    function success(employees: any) { return { type: employeeConstants.GETALL_SUCCESS, employees }; }
    function failure(error: any) { return { type: employeeConstants.GETALL_FAILURE, error }; }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: any) {
    return (dispatch: any) => {
        dispatch(request(id));
        
        employeeService.delete(id)
            .then(
                () => { 
                    dispatch(success(id));
                },
                (error: any) => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id: any) { return { type: employeeConstants.DELETE_REQUEST, id }; }
    function success(id: any) { return { type: employeeConstants.DELETE_SUCCESS, id }; }
    function failure(id: any, error: any) { return { type: employeeConstants.DELETE_FAILURE, id, error }; }
}

function update(employee: any) {
    return (dispatch: any) => {
        dispatch(request(employee));

        employeeService.update(employee)
            .then(
                () => { 
                    dispatch(success(employee));
                    dispatch(alertActions.success('Update account successful'));
                    history.push('/employees');
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(employee: any) { return { type: employeeConstants.UPDATE_REQUEST, employee }; }
    function success(employee: any) { return { type: employeeConstants.UPDATE_SUCCESS, employee }; }
    function failure(error: any) { return { type: employeeConstants.UPDATE_FAILURE, error }; }
}