import React, {Component} from "react/cjs/react.production.min";
import {Col, Grid, Row} from "react-bootstrap";
import MyTickets from "./UIComponents/TicketTable";
import {Redirect} from "react-router-dom";
import TechInfo from "./UIComponents/TechSupportHelper";
import SupportInfo from "./UIComponents/HelpdeskHelper";
import UserProfile from "./UIComponents/UserProfile";
import api_url, {handleRequestError} from "./config/api";
import CommentBox from "./UIComponents/Comment";

export default class Assigned extends Component {

    state = {
        showCommentBox: false,
        selectedTicket: null,
        tickets: [],
        support_users: [],
    };


    componentDidMount() {
        console.log("Mount");
        this.updateTickets();
        this.updateSupport();
    }

    updateTickets = () =>{
        if(!this.props.authed)
            return false;
        let request = {
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(this.props.login_info.email + ":" + this.props.login_info.apiToken),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(api_url + '/tickets/assigned', request)
            .then(handleRequestError)
            .then((json) => {
                this.setState({
                    selectedTicket: null,
                    tickets: json
                });
            }).catch((e) => {
            console.log("Error: " + e);
        });
    };

    updateSupport = () => {
        if(!this.props.authed)
            return false;
        let request = {
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(this.props.login_info.email + ":" + this.props.login_info.apiToken),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(api_url + '/users/tech', request)
            .then(handleRequestError)
            .then((json) => {
                this.setState({
                    support_users: json,
                })
            }).catch((e) => {
            console.log(e);
        })
    };



    // Started using bootstrap here because I realised how limited MaterialUI is in terms of laying out components
    render() {
        const isHelperClosed = this.state.selectedTicket === null;
        const currentTicket = this.state.tickets[this.state.selectedTicket];
        return (
            <Grid>
                {!this.props.authed ? (<Redirect to="/login"/>):(
                    <Row>
                        <Col xs={12} md={3}>
                            <UserProfile
                                {...this.props}
                            />
                        </Col>
                        <Col xs={isHelperClosed * 4 + 8} md={isHelperClosed * 4 + 5}>
                            <MyTickets
                                {...this.props}
                                tickets={this.state.tickets}
                                onSelectCallback={this.setSelectedTicket}
                                selectedTicket={this.state.selectedTicket}
                            />
                        </Col>
                        <Col xs={!isHelperClosed * 4} md={!isHelperClosed * 4}>
                            {this.props.login_info.userType === "tech"?(
                                <TechInfo
                                    {...this.props}
                                    tickets={this.state.tickets}
                                    support={this.state.support_users}
                                    onDeselectCallback={this.deSelectTicket}
                                    selectedTicket={this.state.selectedTicket}
                                    onTicketUpdate={this.updateTickets}
                                    onAddComment={this.commentRequestHandler}
                                />
                                ):(
                                <SupportInfo
                                    {...this.props}
                                    tickets={this.state.tickets}
                                    support={this.state.support_users}
                                    onDeselectCallback={this.deSelectTicket}
                                    selectedTicket={this.state.selectedTicket}
                                    onTicketUpdate={this.updateTickets}
                                    onAddComment={this.commentRequestHandler}
                                />
                            )}
                        </Col>
                    </Row>
                )}
                {!isHelperClosed &&
                <CommentBox
                    {...this.props}
                    id={currentTicket.id}
                    show={this.state.showCommentBox}
                    close={this.onCancelCommentRequest}
                />
                }
            </Grid>
        )
    }

    commentRequestHandler = () => {
        if (this.state.selectedTicket === null)
            return;
        this.setState({
            showCommentBox: true


        })
    };

    onCancelCommentRequest = () => {
        this.setState({
            showCommentBox: false
        })
    };

    deSelectTicket = () => {
        this.setState({
            selectedTicket: null,
        })
    };
    setSelectedTicket = (e) => {
        this.setState({
            selectedTicket: e
        });
    };
}