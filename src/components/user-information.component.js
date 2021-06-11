import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class UserInfo extends Component {  
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            editInformation: false
        }

        //this.getUserInfo = this.getUserInfo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.changeToInputBox = this.changeToInputBox.bind(this);
    }

    componentDidMount() {
        //this.getUserInfo();

        axios.get('/posts/user-info').then(res => {
            console.log("user-info", res.data);
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName
            });
        });
    }

    componentWillUnmount()  {
        
    }

    handleChange(event) {

        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value,
        });
    }

    // getUserInfo() {
    //     axios.get('/posts/user-info').then(res => {
    //         console.log("user-info", res.data);
    //         this.setState({
    //             firstName: res.data.firstName,
    //             lastName: res.data.lastName
    //         });
    //         //console.log('state:', this.state)
    //     });
    // }

    changeToInputBox = () => {

        this.setState({
            editInformation: !this.state.editInformation,
        });

        console.log("Trying to edit!");
    }

    renderInfoEditor = () => {
        return <div>
            <div>
                <input type="text" required value={this.state.firstName} name="firstName" onChange={this.handleChange}></input>
            </div>
            <div>
                <input type="text" required value={this.state.lastName} name="lastName" onChange={this.handleChange}></input>
            </div>
            <div>
                <input type="button" value="Update User Information!" onClick={this.updateUserInfo}></input>
            </div>
        </div>
    }

    renderDefaultInfo = () => {
        return <div>
            <h4>Firstname: </h4>
            <div>{this.state.firstName}</div>
            <h4>Lastname:</h4>
            <div>{this.state.lastName}</div>
            <div>
                <input type="button" value="Edit Button" onClick={this.changeToInputBox}></input>
            </div>
        </div>
    }

    updateUserInfo = () => {

        this.setState({
            editInformation: false,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })

        console.log("Current state!", this.state);

        const updatedUserInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        axios.post('/posts/update-user-info', updatedUserInfo).then(res => {
            if (res.status === 200) {
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });
            }
        }).catch(error => {
            console.log('Something went wrong!', error);
        });
    }

    render() {

        const loggedIn = this.props.loggedIn;

        if (loggedIn === true) {
            if (this.state.editInformation === true) {
                return this.renderInfoEditor();
            }
            else if (this.state.editInformation === false) {
                return this.renderDefaultInfo();
            }
        }

        else {
            return <Redirect to = {{pathname: this.state.redirectTo}} />
        }

    }
}