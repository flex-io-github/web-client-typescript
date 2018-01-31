import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    update
};

function login(username: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                (user: any) => { 
                    dispatch(success(user));
                    history.push('/');
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user: any) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user: any) {
    return (dispatch: any) => {
        dispatch(request(user));

        userService.register(user)
            .then(
                () => { 
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user: any) { return { type: userConstants.REGISTER_REQUEST, user }; }
    function success(user: any) { return { type: userConstants.REGISTER_SUCCESS, user }; }
    function failure(error: any) { return { type: userConstants.REGISTER_FAILURE, error }; }
}

function getAll() {
    return (dispatch: any) => {
        dispatch(request());

        userService.getAll()
            .then(
                (users: any) => dispatch(success(users)),
                (error: any) => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST }; }
    function success(users: any) { return { type: userConstants.GETALL_SUCCESS, users }; }
    function failure(error: any) { return { type: userConstants.GETALL_FAILURE, error }; }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: any) {
    return (dispatch: any) => {
        dispatch(request(id));
        
        userService.delete(id)
            .then(
                () => { 
                    dispatch(success(id));
                },
                (error: any) => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id: any) { return { type: userConstants.DELETE_REQUEST, id }; }
    function success(id: any) { return { type: userConstants.DELETE_SUCCESS, id }; }
    function failure(id: any, error: any) { return { type: userConstants.DELETE_FAILURE, id, error }; }
}

function update(user: any) {
    return (dispatch: any) => {
        dispatch(request(user));

        userService.update(user)
            .then(
                () => { 
                    dispatch(success(user));
                    dispatch(alertActions.success('Update account successful'));
                    history.push('/');
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user: any) { return { type: userConstants.UPDATE_REQUEST, user }; }
    function success(user: any) { return { type: userConstants.UPDATE_SUCCESS, user }; }
    function failure(error: any) { return { type: userConstants.UPDATE_FAILURE, error }; }
}