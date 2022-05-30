import decode from 'jwt-decode';

class AuthService {
    // retrieve data stored in profile
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is still logged in
    loggedIn() {
        // checks if there is a saved token and it is still valid
        const token = this.getToken();
        // check that token is NOT undefined and NOT expired
        return !token && !this.isTokenExpired(token);
    }

    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000 ) {
                return true;
            } else {
                return false;
            }
        } catch {
            return false;
        };
    }

    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // clear token from localStorage and reload page to homepage
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
};

export default new AuthService();