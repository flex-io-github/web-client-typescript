import { authHeader, config } from '../_helpers';

export const lookupService = {
    authUserRoles
}

function authUserRoles() {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/lookup/auth_user_roles', requestOptions).then(handleResponse, handleError);
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