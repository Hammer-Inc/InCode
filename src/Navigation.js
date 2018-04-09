import React, {Component} from "react/cjs/react.production.min";

import {NavLink} from "react-router-dom";
import {AppBar, Dialog, Drawer, IconButton, MenuItem} from "material-ui";
import {NavigationCheck, NavigationClose, NavigationMenu} from "material-ui/svg-icons/index";
import Backdrop from "./UIComponents/Backdrop"
import {red900} from "material-ui/styles/colors";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            confirmLogout: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <nav>
                <AppBar
                    title={this.state.open ? "" : "Ticket Collector"}
                    iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu/></IconButton>}
                />
                <Drawer open={this.state.open}>
                    <AppBar
                        title="Navigation"
                        titleStyle={{cursor: 'pointer'}}
                        onTitleTouchTap={this.handleToggle}
                        iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose/></IconButton>}
                    />
                    <MenuItem onClick={this.handleToggle}><NavLink to="/">Home</NavLink></MenuItem>
                    {this.props.authed !== true && (
                        <MenuItem onClick={this.handleToggle}><NavLink to="/login">Login</NavLink></MenuItem>)}
                    {this.props.authed && (
                        <MenuItem onClick={this.handleToggle}><NavLink to="/assigned">My Tickets</NavLink></MenuItem>)}
                    {this.props.authed && (<MenuItem onClick={this.confirmLogout}>Logout</MenuItem>)}
                </Drawer>
                {this.state.open && (<Backdrop onClick={this.handleToggle}/>)}
                <Dialog
                    title={"Confirm Logout."}
                    titleStyle={{color: red900}}
                    modal={false}
                    actions={[(<IconButton className="btn btn-success" onClick={this.cancelLogout}><NavigationClose/>
                        Cancel</IconButton>), (
                        <IconButton className="btn btn-danger" onClick={this.performLogout}><NavigationCheck/>
                            Logout</IconButton>)]}
                    open={this.state.confirmLogout}
                    onRequestClose={this.cancelLogout}
                >
                    Are you sure you want to log out?
                </Dialog>
            </nav>
        );
    }

    performLogout = () => {
        this.setState({
            confirmLogout: false
        });
        this.props.doLogoutCallback();
    };

    confirmLogout = () => {
        this.setState({
            confirmLogout: true
        });
    };

    cancelLogout = () => {
        this.setState({
            confirmLogout: false
        });
    };
}