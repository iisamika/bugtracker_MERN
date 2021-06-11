import React, { Component } from 'react';

export default class LoginSuccessful extends Component {

    render() {
        const loggedIn = this.props.loggedIn;
        return (
            <div>
                {loggedIn ? (
                    <h3>Login successful!</h3>
                ) : (
                        <h3>Logout successful!</h3>
                    )}
            </div>
        )
    }
}