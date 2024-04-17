import React, { createContext, useContext } from 'react';

const UserContext = createContext({});
class UserProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                token: localStorage.getItem('token'),
                userInfo: JSON.parse(localStorage.getItem('userInfo')),
                expiresAt: localStorage.getItem('expiresAt'),
            }
        }
        this.setUserContext = this.setUserContext.bind(this);
        this.logout = this.logout.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

    setUserContext({ token, userInfo, expiresAt }) {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('expiresAt', expiresAt);

        var userData = {
            token: token, 
            userInfo: userInfo,
            expiresAt: expiresAt,
        }

        this.setState({user: userData});
    }
    

    logout() {
        localStorage.clear();
        this.setState({user: { token: '', userInfo: {}, expiresAt: 0 }});
    }

    isAuthenticated() {
        if (!this.state.user.token || !this.state.user.expiresAt)
            return false;
        return true
        //TODO return new Date().getTime() / 1000 < user.expiresAt
    };

    isAdmin() {
        return this.state.user.userInfo.role === 'admin';
    };

    render() {
        return (
            <UserContext.Provider value={{ 
                user: this.state.user, 
                setUserContext: this.setUserContext,
                logout: this.logout, 
                isAuthenticated: this.isAuthenticated, 
                isAdmin: this.isAdmin 
            }}>
                { this.props.children }
            </UserContext.Provider>
        );
    }
}

function useUserContext() {
    return useContext(UserContext);
}

export { useUserContext, UserProvider }