import React, {Component} from "react/cjs/react.production.min";
import Main from "../Main";
import Navigation from "../Navigation";
import {Snackbar} from "material-ui";

/** Auth Component
    Contains all functions/states required to update the authentication state.
 */
export default class Auth extends Component {
    state = {
        isAuthed: false,
        login_info: {
            id: 0,
            name: "Guest",
            email: "Unknown",
            apiToken: "",
            userType: "user"
        },
        notification:{
            show: false,
            message : "",
        }
    };

    render() {
        return (<div>
            <Navigation
                authed={this.state.isAuthed}
                login_info={this.state.login_info}
                doLogoutCallback={this.logout}
                notify={this.notify}
            />
            <Main
                loginCallback={this.doLogin}
                authed={this.state.isAuthed}
                login_info={this.state.login_info}
                notify={this.notify}
            />
            <br/>
            <Snackbar
                open={this.state.notification.show}
                message={this.state.notification.message}
                autoHideDuration={4000}
                onRequestClose={this.hideNotification}
            />

            <label className="text-muted">This application was created by Avraham Hammer (S3599575)</label>
        </div>);
    }

    doLogin = (loginArray) => {
        this.setState({
            isAuthed: true,
            login_info: loginArray
        });
        this.notify("Welcome " + loginArray['name'] + ", You are now logged in!")

    };

    logout = () => {
        this.setState({
            isAuthed: false,
            id: 0,
            name: "Guest",
            email: "Unknown",
            apiToken: "",
            userType: "user"
        })
    };

    notify = (message) => {
        this.setState({
            notification:{
                show:true,
                message: message,
            }
        })
    };
    hideNotification = () => {
        this.setState({
            notification:{
                show:false,
                message:""
            }
        })
    }
}

