import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class Navbar extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        axios.post('/posts/logout').then(res => {
            if (res.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    userName: null
                });

                this.setState({
                    redirectTo: '/login-success'
                });
            }
        }).catch(error => {
            console.log('Logout error!');
        });
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render props: ', this.props);
        return (
            <div>
                {loggedIn ? (

                    <nav>
                        <Link to='/' className="navbar-brand">Front page</Link>
                        <Link to="/user-info" className="navbar-brand">User Info</Link>
                        <Link to="/login-success" className="navbar-brand" onClick={this.logout}>Logout</Link>
                    </nav>

                ) : (
                        <nav className="navbar">
                            <Link to='/' className="navbar-brand">Front page</Link>
                            <Link to='/create-user' className="navbar-brand">Create New User</Link>
                            <Link to='/login' className="navbar-brand">Login</Link>
                        </nav>

                    )}
            </div>
        )
    }
}