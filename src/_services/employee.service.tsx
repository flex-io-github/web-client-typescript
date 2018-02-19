import { authHeader, config } from '../_helpers';

export const employeeService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Employees', requestOptions).then(handleResponse, handleError);
}

function getById(id: any) {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Employees/' + id, requestOptions).then(handleResponse, handleError);
}

function add(employee: any) {
    const requestOptions: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    };
    
    return fetch(config.apiUrl + '/api/Employees', requestOptions).then(handleResponse, handleError);
}

function update(employee: any) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    };

    return fetch(config.apiUrl + '/api/Employees/' + employee.id, requestOptions).then(handleResponse, handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: any) {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Employees/' + id, requestOptions).then(handleResponse, handleError);
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