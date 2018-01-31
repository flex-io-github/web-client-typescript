import { authHeader, config } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username: any, password: any) {
    const requestOptions: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(config.apiUrl + '/users/authenticate', requestOptions)
        .then(handleResponse, handleError)
        .then((user: any) => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users', requestOptions).then(handleResponse, handleError);
}

function getById(id: any) {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}

function register(user: any) {
    const requestOptions: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    
    return fetch(config.apiUrl + '/users/register', requestOptions).then(handleResponse, handleError);
}

function update(user: any) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/users/' + user.id, requestOptions).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: any) {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response: any) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                response.json().then((json: any) => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then((text: any) => reject(text));
        }
    });
}

function handleError(error: any) {
    return Promise.reject(error && error.message);
}