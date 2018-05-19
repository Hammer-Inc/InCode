import React, {Component} from "react/cjs/react.production.min";
import {apiLocation} from "../config";
import validateResponse from "../Logic/API";
import {CircularProgress, Paper} from "material-ui";
import {AlertErrorOutline, NavigationClose} from "material-ui/svg-icons/index";
import {purple500, red500} from "material-ui/styles/colors";

export default class StatusViewer extends Component {
    state = {
        loading: true,
        connection: "pending"
    };

    constructor(props) {
        super(props);

        let request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(apiLocation + "api/v1/is_alive", request)
            .then(validateResponse)
            .then((data) => {
                this.setState({
                    loading: false,
                    connection: "valid",
                });
            }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false,
                connection: "failed"
            });
        })
    }

    render() {
        const alertStyle = {
            marginBottom: "2px",
            textAlign: "left",
            // height: "24px",
            paddingInlineStart: "10px",
            paddingInlineEnd: "10px",
        };
        const iconStyle = {
            marginRight: '5px',
            float: "left",
        };
        const closeIconStyle = {
            paddingRight: "10px",
            float: "right",
            position: "relative",
            cursor: "pointer",
        };
        const progressStyle = {
            marginRight: '10px',
            color: purple500,
            float: "left",
        };
        let {connection, loading} = this.state;
        let alertClassName = "alert " + connection === "pending" ? "alert-warning" :
            connection === "failed" ? "alert-danger" : "alert-success";
        if (connection === "valid" || connection === "hidden") {
            return null;
        }
        return <Paper>
            <div className={alertClassName} role="alert">
                {connection === "pending" ?
                    <div style={alertStyle}>
                        <CircularProgress size={18} thickness={1} color={purple500} style={progressStyle}/>
                        Checking server state
                    </div>
                    :
                    <div style={alertStyle}>
                        <AlertErrorOutline style={iconStyle} color={red500}/>
                        <span>
                        Server Offline
                        </span>
                        <NavigationClose style={closeIconStyle} onClick={() => this.setState({connection: "hidden"})}>
                        </NavigationClose>

                    </div>
                }
            </div>
        </Paper>
    }
}
