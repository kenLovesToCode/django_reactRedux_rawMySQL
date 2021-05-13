class AuthToken{
    constructor(){
        this.auth = JSON.parse(localStorage.getItem('auth')) || {};
    }

    setUserAuth(auth){
        this.user_auth = auth;
        localStorage.setItem("auth", JSON.stringify(auth));
    }

    getToken(){
        return this.auth.user_token;
    }

    getUserID(){
        return this.auth.user_id;
    }

    logout(){
        localStorage.removeItem('auth');
    }
}

export default new AuthToken();