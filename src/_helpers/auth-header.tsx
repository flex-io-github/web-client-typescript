export function authHeader() {
    // return authorization header with jwt token
    let userJSON = localStorage.getItem('user');
    let user = userJSON !== null ? JSON.parse(userJSON) : '';

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}