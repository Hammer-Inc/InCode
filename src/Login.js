import React from 'react';
import TextField from 'material-ui/TextField';
import {Component} from "react/cjs/react.production.min";
import {CircularProgress, Dialog, IconButton, RaisedButton} from "material-ui";
import {Card, CardActions, CardText, CardTitle} from "material-ui/Card"
import api_url, {handleRequestError} from "./config/api";
import Backdrop from "./UIComponents/Backdrop";
import {Alert} from "react-bootstrap";
import {NavigationClose} from "material-ui/svg-icons/index";
import {red900} from "material-ui/styles/colors";
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isHelpdesk: true,
            loading: false,
            failedLogin: false,
        };
    }

    handleUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleTechClick = (e) => {
        this.setState({
            isHelpdesk: false,
        });

    };
    handleHelpClick = (e) => {
        this.setState({
            isHelpdesk: true,
        });
    };

    handleSubmitClick = (e) => {
        this.setState({loading: true});
        let userType = this.state.isHelpdesk ? "helpdesk" : "tech";
        let request = {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + btoa(this.state.username + ":" + this.state.password),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userType: userType,
            })
        };

        fetch(api_url + '/auth', request)
            .then(handleRequestError)
            .then((data) => {
            let login = {
                'apiToken': data['api_token'],
                'id': data['id'],
                'name': data['name'],
                'email': data['email'],
                'userType': data['role']
            };
            this.props.loginCallback(login);

            this.setState({
                loading: false,
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false,
                failedLogin: true
            });
        })
    };

    render() {
        let activeStyle = {
            borderStyle: 'solid',
            borderRadius: '2px',
            borderWidth: '1px',
            borderColor: 'cyan',
        };
        let passiveStyle = {
            borderStyle: 'solid',
            borderRadius: '2px',
            borderWidth: '1px',
            borderColor: 'lightgrey',
        };
        return (
            <div>
                {this.props.authed && (<Alert bsStyle="warning">
                    <Redirect to="/assigned"/>
                </Alert>)}
                {this.state.loading && <Backdrop><CircularProgress size={80} thickness={5}/></Backdrop>}
                <br/>
                <Card>
                    <CardTitle
                        title={"Welcome to Ticket Collector"}
                        subtitle={"Please enter your preassigned login credentials below"}
                    />
                    <CardActions>
                        <RaisedButton
                            label={"I'm a Helpdesk user"}
                            style={this.state.isHelpdesk ? activeStyle : passiveStyle}
                            onClick={this.handleHelpClick}
                            disabled={this.props.authed}

                        />
                        <RaisedButton
                            label={"I'm a Technical Support user"}
                            style={!this.state.isHelpdesk ? activeStyle : passiveStyle}
                            onClick={this.handleTechClick}
                            disabled={this.props.authed}

                        />
                    </CardActions>
                    <CardText>
                        <TextField
                            type="email"
                            name="username"
                            hintText="staff.name@rmit.edu.au"
                            floatingLabelText="Enter your email address"
                            floatingLabelFixed
                            onChange={this.handleUsername}
                            disabled={this.props.authed}
                        />
                        <br/>
                        <TextField
                            type="password"
                            name="password"
                            hintText="Hunter2"
                            floatingLabelText="Enter your password"
                            floatingLabelFixed
                            onChange={this.handlePassword}
                            disabled={this.props.authed}

                        />
                        <br/>
                        <RaisedButton
                            label="Login"
                            primary={true}
                            onClick={this.handleSubmitClick}
                            disabled={this.props.authed}
                        />
                    </CardText>


                </Card>

                <Dialog
                    title={"Login failed!"}
                    titleStyle={{color: red900}}
                    modal={false}
                    actions={(<IconButton onClick={this.resetDialogs}><NavigationClose/> Close</IconButton>)}
                    open={this.state.failedLogin}
                    onRequestClose={this.resetDialogs}
                >
                    Your username/password was incorrect or you attempted to login as a role you are not.
                </Dialog>
            </div>
        );
    }

    resetDialogs = () => {
        this.setState({
            failedLogin: false
        })
    }
}

export default Login;
