import * as React from 'react';
import './App.css';
import { Route, Router } from 'react-router-dom';
import { connect } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";

import { PrivateRoute } from '../_components/PrivateRoute';
import NavBar from './_components/NavBar';
import Footer from './_components/Footer';
import SidebarMenu from './_components/SidebarMenu';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserEditPage from '../UserEditPage/UserEditPage';

export interface AppProps extends React.Props<any> {
    dispatch: (action: any) => void;
}

class App extends React.Component<AppProps, {}> {
    constructor(props: any) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render(){
        return (
            <div className='App'>
                <div className='header'>
                    <NavBar />
                </div>
                <div className='body'>
                    <div className='content'>
                        <div className='container'>
                            <Router history={history}>
                                <div>
                                    <PrivateRoute
                                        exact={true}
                                        path='/'
                                        component={HomePage}
                                    />
                                    <Route
                                        path='/login'
                                        component={LoginPage}
                                    />
                                    <Route
                                        path="/register"
                                        component={RegisterPage}
                                    />
                                    <Route
                                        path={"/user/:UserId"}
                                        component={UserEditPage}
                                    />
                                </div>
                            </Router>
                        </div>
                    </div>
                    <div className='sidebar'>
                        <SidebarMenu />
                    </div>
                </div>
        
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const { alert } = state;
    const { loggedIn } = state.authentication;
    return {
        alert,
        loggedIn
    };
}

export default connect(mapStateToProps)(App);
